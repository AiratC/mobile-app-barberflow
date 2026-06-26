import { LoginResponse } from "../../types/auth.types";
import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      // register
      register: builder.mutation<any, any>({
         query: (userData) => ({
            url: `/auth/register`,
            method: 'POST',
            body: userData
         })
      }),
      // login
      login: builder.mutation<LoginResponse, any>({
         query: (credentials) => ({
            url: `/auth/login`,
            method: 'POST',
            body: credentials
         })
      }),
      // Получение профиля текущего пользователя
      getProfile: builder.query<any, void>({
         query: () => ({
            url: `/auth/get-me`,
            method: 'GET'
         })
      })
   })
});

export const {
   useRegisterMutation,
   useLoginMutation,
   useGetProfileQuery,
   useLazyGetProfileQuery
} = authApi;