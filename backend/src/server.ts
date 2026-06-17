import http from 'http';
import dotenv from 'dotenv';
import { router } from './router.ts';
import { initAdminAccount } from './config/initAdminAccount.ts';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {

   // Подключаем роутер
   await router(req, res);

});

server.listen(PORT, async () => {
   // Инициализация админа
   await initAdminAccount();
   console.log(`Server start in PORT: ${PORT}`);
});