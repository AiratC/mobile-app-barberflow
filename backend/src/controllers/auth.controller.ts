import { IncomingMessage, ServerResponse } from "node:http";
import { getBodyData } from "../utils/bodyParser.ts";
import { sendJSON } from "../utils/sendJson.ts";
import validateEmail from "../utils/validateEmail.ts";
import { query } from "../config/db.ts";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { type AuthenticatedRequest } from "../types/isAuth.types.ts";

// !!! Регистрация или восстановление
export const registerController = async (req: IncomingMessage, res: ServerResponse) => {
   try {
      const data = await getBodyData(req);
      const { name, email, password } = data;

      const CLIENT_ROLE_ID = 4;

      // Очистка значений от пробелов
      const clearName = name?.trim();
      const clearEmail = email?.toLowerCase().trim();
      const clearPassword = password?.trim();

      // Проверка значений на валидность
      if (!clearName || !clearEmail || !clearPassword) {
         return sendJSON(res, {
            success: false,
            message: 'Заполните все поля ввода'
         }, 400);
      };

      // Проверка валидности email
      if (!validateEmail(clearEmail)) {
         return sendJSON(res, {
            success: false,
            message: "Неверный email"
         }, 400);
      }

      // Пароль должен быть >= 7 символов
      if (clearPassword.length < 7) {
         return sendJSON(res, {
            success: false,
            message: 'Пароль должен быть не меньше 7 символов'
         }, 400);
      };

      // 1. Проверяем, не был ли аккаунт мягко удален
      const deletedUserCheck = await query(
         `
         SELECT id FROM users WHERE email = $1 AND is_deleted = true
         `,
         [clearEmail]
      );

      if(deletedUserCheck.rows.length > 0) {
         return sendJSON(
            res,
            {
               success: false,
               code: 'ACCOUNT_DELETED',
               message: "Этот аккаунт был ранее удален. Вы можете его восстановить."
            },
            400
         );
      };

      // 2. Проверяем на обычные дубликаты активных пользователей
      const activeUserCheck = await query(
         `
            SELECT id FROM users WHERE email = $1 AND is_deleted = false
         `,
         [clearEmail]
      );

      if (activeUserCheck.rows.length > 0) {
         return sendJSON(res, {
            success: false,
            message: 'Пользователь уже зарегистрирован'
         }, 400)
      };

      // Хешируем пароль
      const passwordHash = await bcrypt.hash(clearPassword, 10);

      // Добавляем пользователя в БД
      const result = await query(
         `
         INSERT INTO users (role_id, name, email, password_hash) 
         VALUES ($1, $2, $3, $4)
         RETURNING id, role_id, name, email, phone, avatar, created_at
         `,
         [CLIENT_ROLE_ID, clearName, clearEmail, passwordHash]
      );

      const userData = result.rows[0]

      return sendJSON(res, {
         success: true,
         message: "Регистрация успешно завершена",
         data: userData
      }, 200);

   } catch (error) {
      return sendJSON(res, { 
         success: false,
         message: 'Server error'
      }, 500)
   }
};

// !!! Вход
export const loginController = async (req: IncomingMessage, res: ServerResponse) => {
   try {
      const { email, password } = await getBodyData(req);

      // Проверка на пустые строки
      const clearEmail = email?.toLowerCase().trim();
      const clearPassword = password?.trim();

      if(!clearEmail || !clearPassword) {
         return sendJSON(res, {
            success: false,
            message: 'Заполните все данные'
         }, 400)
      };

      // Проверка валидности email
      if (!validateEmail(clearEmail)) {
         return sendJSON(res, {
            success: false,
            message: "Неверный email"
         }, 400);
      };

      // Поиск пользователя
      const findUser = await query(
         `
            SELECT u.*, r.name as role_name FROM users u
            JOIN roles r ON u.role_id = r.id
            WHERE email = $1 AND is_deleted = false
         `,
         [clearEmail]
      );

      // Проверка существования
      if(findUser.rows.length === 0) {
         return sendJSON(
            res,
            {
               success: false,
               message: 'Неверный email или пароль'
            },
            401
         );
      };

      const user = findUser.rows[0];

      // Проверка пароля: Юзер есть. Теперь сравниваем пароль из запроса с хэшем из базы
      const isMatch = await bcrypt.compare(clearPassword, user.password_hash);

      if(!isMatch) {
         return sendJSON(
            res,
            {
               success: false,
               message: 'Неверный email или пароль'
            },
            401
         );
      };

      // Генерация токена: Если пароль совпал, создаем токен:
      const secret = process.env.TOKEN_SECRET_KEY as string;

      if(!secret) {
         return sendJSON(res, {
            success: false,
            message: `TOKEN_SECRET_KEY is not defined in .env`
         }, 400);
      };

      const tokenData = { userId: user.id, role_name: user.role_name }

      const token = jwt.sign(
         tokenData,
         secret,
         { expiresIn: '7d' }
      );

      // 7 дней в секундах = 604800 (синхронно с expiresIn: '7d')
      const SEVEN_DAYS_IN_SECONDS = 604800;

      // Установка заголовка Set-Cookie
      res.setHeader('Set-Cookie', [
         `token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${SEVEN_DAYS_IN_SECONDS}; Path=/`
      ]);

      // Получаю все данные пользователя кроме hash_password
      const { password_hash, ...userData } = user;

      return sendJSON(res, { user: userData, token, success: true }, 200);

   } catch (error) {
      console.log(error);
      return sendJSON(res, { success: false, message: 'Server error' }, 500)
   }
};

// !!! Выход
export const logoutController = async (req: IncomingMessage, res: ServerResponse) => {
   try {
      res.setHeader('Set-Cookie', [
         'token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0'
      ]);

      return sendJSON(res, { user: null }, 200);
   } catch (error) {
      return sendJSON(res, { error: 'Server error' }, 500);
   }
};

// Делаем запрос актуального профиля
export const getMe = async (req: AuthenticatedRequest, res: ServerResponse) => {
   // Благодаря middleware, здесь мы 100% уверены, что req.user существует
   const currentUser = req.user;

   try {
      const findUser = await query(
         `
            SELECT u.*, r.name as role_name FROM users u
            JOIN roles r ON u.role_id = r.id
            WHERE u.id = $1 AND is_deleted = false
         `,
         [currentUser?.userId]
      );

      // Проверяем, нашел ли SQL-запрос запись
      if (findUser.rows.length === 0) {
         return sendJSON(res, { success: false, message: 'Пользователь не найден' }, 404);
      }

      // Получаю все данные пользователя кроме hash_password
      const { password_hash, ...userData } = findUser.rows[0];

      return sendJSON(res, { user: userData, success: true }, 200);
   } catch (error) {
      return sendJSON(
         res,
         {
            success: false,
            message: 'Server error'
         },
         500
      )
   }
}