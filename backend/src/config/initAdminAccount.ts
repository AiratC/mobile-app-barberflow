import { query } from "./db.ts"
import bcrypt from 'bcrypt'

// !!! Создание дефолтного админа при старте сервера
export const initAdminAccount = async () => {
   try {
      // 1. Получаем id роли админа
      const roleResult = await query(`SELECT id FROM roles WHERE name = 'admin' LIMIT 1`);

      if(roleResult.rows.length === 0) {
         console.log('⚠️ Роль "admin" не найдена в базе. Сначала накатите миграции!');
         return;
      };

      const roleId = roleResult.rows[0].id;

      // 2. Проверяем есть ли хоть один админ
      const checkAdmin = await query(
         `SELECT EXISTS(SELECT 1 FROM users WHERE role_id = $1) as "hasAdmin"`, 
         [roleId]);

      // Если админ уже создан, тихо выходим, чтобы не дублировать
      if(checkAdmin.rows[0].hasAdmin) {
         console.log('ℹ️ Проверка системы: Администратор уже существует в базе.');
         return;
      };

      // Инициализируем дефолтный данные
      const defaultName = 'admin';
      const defaultEmail = 'admin@gmail.com';
      const defaultPassword = 'admin12345';

      // Хешируем пароль (10 раундов соли — база безопасности)
      const passwordHash = await bcrypt.hash(defaultPassword, 10);
      console.log(passwordHash)

      // 4. Сохраняем админа в базу данных
      await query(
         `
         INSERT INTO users (role_id, name, email, password_hash) VALUES ($1, $2, $3, $4)
         `,
         [roleId, defaultName, defaultEmail, passwordHash]
      );

      console.log('\x1b[36m%s\x1b[0m', '==================================================');
      console.log('\x1b[32m%s\x1b[0m', '🚀 Сид базы данных: Дефолтный админ успешно создан!');
      console.log(`👤 Имя: ${defaultName}`);
      console.log(`📧 Email: ${defaultEmail}`);
      console.log(`🔑 Пароль: ${defaultPassword}`);
      console.log('\x1b[33m%s\x1b[0m', '⚠️ Не забудьте изменить эти данные в профиле CRM!');
      console.log('\x1b[36m%s\x1b[0m', '==================================================');
   } catch (error) {
      console.error('❌ Ошибка при автоматическом создании админа:', error);
   }
}