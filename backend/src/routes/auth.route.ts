import { IncomingMessage, ServerResponse } from "node:http";
import { getMe, loginController, logoutController, registerController } from "../controllers/auth.controller.ts";
import { isAuth } from "../middleware/isAuth.middleware.ts";


export const authRouter = async (req: IncomingMessage, res: ServerResponse) => {
   const { url, method } = req;

   if(method === 'POST' && url === `/api/auth/register`) {
      return await registerController(req, res);
   } else if (method === 'POST' && url === `/api/auth/login`) {
      return await loginController(req, res);
   } else if (method === 'POST' && url === '/api/auth/logout') {
      return await logoutController(req, res);
   } else if (method === 'GET' && url === '/api/auth/get-me') {
      return await (await isAuth(getMe))(req, res);
   }
};