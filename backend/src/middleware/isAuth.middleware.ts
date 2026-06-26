import { ServerResponse } from "node:http"
import { type AuthenticatedRequest } from "../types/isAuth.types.ts"
import { sendJSON } from "../utils/sendJson.ts";
import jwt from 'jsonwebtoken';


export const isAuth = async (next: (req: AuthenticatedRequest, res: ServerResponse) => Promise<void> | void) => {
   return async function (req: AuthenticatedRequest, res: ServerResponse) {
      try {
         console.log('Заголовки запросов: ', req.headers);

         const authHeader = req.headers['authorization'];
         if (!authHeader || !authHeader.startsWith('Bearer')) {
            return sendJSON(res, {
               success: false,
               message: 'Не авторизован: отсутствует токен'
            },
               401
            )
         };

         // Извлекаем токен
         const token = authHeader.split(' ')[1];

         // Верифицируем токен
         const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY as string);

         // Мутируем объект запроса — записываем туда расшифрованные данные
         req.user = decoded as { userId: string; role_name: string; };

         // ТОЛЬКО ТЕПЕРЬ, когда проверка прошла, мы РЕАЛЬНО вызываем следующий контроллер!
         return await next(req, res);

      } catch (error: any) {
         console.error("Ошибка авторизации в Middleware:", error.message);
         return sendJSON(
            res,
            {
               success: false,
               message: 'Невалидный или протухший токен'
            },
            500
         )
      }
   }
}