import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../../constants/constants";
import { RootState } from "../store";

export const baseApi = createApi({
   reducerPath: 'api',
   baseQuery: fetchBaseQuery({
      baseUrl: `${BACKEND_URL}/api`,
      /*
      Чтобы бэкенд понимал, кто делает запросы, токен нужно прикреплять 
      к каждому запросу в заголовок Authorization. RTK Query позволяет 
      сделать это централизованно через prepareHeaders.
      */
      prepareHeaders: (headers, { getState }) => {
         const token = (getState() as RootState).auth.token;
         if (token) {
            headers.set('authorization', `Bearer ${token}`);
         };
         return headers;
      }

   }
   ),
   tagTypes: [
      'User'
   ],
   endpoints: (builder) => ({}),
})