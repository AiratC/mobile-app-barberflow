import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../../constants/constants";

export const baseApi = createApi({
   reducerPath: 'api',
   baseQuery: fetchBaseQuery({
      baseUrl: `${BACKEND_URL}/api`
   }
   ),
   endpoints: () => ({}),
})