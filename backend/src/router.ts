import { IncomingMessage, ServerResponse } from "node:http";
import { sendJSON } from "./utils/sendJson.ts";
import { authRouter } from "./routes/auth.route.ts";


export const router = async (req: IncomingMessage, res: ServerResponse) => {
   const { url } = req;

   if(url?.startsWith(`/api/auth`)) {
      // тут вызывем контроллер роутера авторизации authRouter.ts из папки ./routes
      return await authRouter(req, res);
   } else if (url?.startsWith(`/api/mobile`)) {
      // тут вызываем контроллер для мобилки
   } else if (url?.startsWith(`/api/crm`)) {
      // тут вызываем контроллер для црм
   }

   return sendJSON(res, { message: 'Router not found 404' }, 404);
}