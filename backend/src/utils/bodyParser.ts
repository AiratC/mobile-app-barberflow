import { IncomingMessage } from "node:http";

export const getBodyData = async (req: IncomingMessage): Promise<any> => {

   return new Promise((resolve, reject) => {
      const body: Uint8Array[] = [];   // В TS чанки буфера лучше типизировать как Uint8Array[]

      req.on('data', (chunk) => {
         body.push(chunk);
      });

      req.on('end', () => {
         try {
            const result = Buffer.concat(body).toString();

            if (!result) {
               return resolve({})
            }

            resolve(JSON.parse(result));
         } catch (error) {
            // Если прислали невалидный JSON — реджектим с понятной ошибкой
            return reject(new Error(`Invalid JSON status 400`));
         }
      });

      req.on('error', (error) => {
         reject(error)
      });
      
   })

}