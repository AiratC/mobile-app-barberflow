import { ServerResponse } from "node:http";

export const sendJSON = (res: ServerResponse, data: object, status: number = 200) => {
   res.writeHead(status, { "content-type": "application/json" });
   res.end(JSON.stringify(data));
}