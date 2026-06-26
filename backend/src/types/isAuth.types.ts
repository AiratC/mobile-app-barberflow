import { IncomingMessage } from "node:http";

export interface AuthenticatedRequest extends IncomingMessage {
   user?: {
      userId: string;
      role_name: string;
   };
};