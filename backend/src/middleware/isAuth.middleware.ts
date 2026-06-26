import { ServerResponse } from "node:http"
import { type AuthenticatedRequest } from "../types/isAuth.types.ts"
import { sendJSON } from "../utils/sendJson.ts";
import jwt from 'jsonwebtoken';


export const isAuth = (next: (req: AuthenticatedRequest, res: ServerResponse) => Promise<void> | void) => {
   return async function (req: AuthenticatedRequest, res: ServerResponse) {
      try {
         const authHeader = req.headers['authorization'];
         if (!authHeader || !authHeader.startsWith('Bearer ')) { // Добавлен пробел после Bearer для надежности
            return sendJSON(res, { success: false, message: 'Не авторизован' }, 401);
         };

         const token = authHeader.split(' ')[1];
         const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY as string);
         
         req.user = decoded as { userId: string; role_name: string; };

         return await next(req, res);
      } catch (error: any) {
         console.error("Ошибка в Middleware:", error.message);
         // Ошибки токена — это вина клиента (401), а не сервера (500)
         return sendJSON(res, { success: false, message: 'Сессия устарела, войдите заново' }, 401);
      }
   }
}