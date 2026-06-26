import http from 'http';
import dotenv from 'dotenv';
import { router } from './router.ts';
import { initAdminAccount } from './config/initAdminAccount.ts';

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

const server = http.createServer(async (req, res) => {
   // 1. Разрешаем запросы с любых устройств (включая эмулятор)
   res.setHeader('Access-Control-Allow-Origin', '*');

   // 2. Разрешаем нужные методы и заголовки (Content-Type, Authorization и т.д.)
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

   // 3. Обязательно обрабатываем предварительный запрос OPTIONS
   if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
   }

   // Подключаем роутер
   await router(req, res);

});

server.listen(PORT, '0.0.0.0', async () => {
   // Инициализация админа
   await initAdminAccount();
   console.log(`Server start in PORT: ${PORT}`);
});