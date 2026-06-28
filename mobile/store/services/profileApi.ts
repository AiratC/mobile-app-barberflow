import { baseApi } from "../api/baseApi";

const profileApi = baseApi.injectEndpoints({
   overrideExisting: false, 
   endpoints: (builder) => ({
      // Получение профиля текущего пользователя
      getProfile: builder.query<any, void>({
         query: () => ({
            url: `/auth/get-me`,
            method: 'GET',
         }),
         providesTags: ['Profile']
      }),
      // Обновление профиля
      updateProfile: builder.mutation<any, Partial<any>>({
         query: (body) => ({
            url: `/auth/update-profile`,
            method: 'PATCH',
            body
         }),
         invalidatesTags: ['Profile']
      })
   }),
});

export const {
   useGetProfileQuery,
   useLazyGetProfileQuery
} = profileApi;