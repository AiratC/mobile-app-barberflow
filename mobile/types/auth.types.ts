// Определяем интерфейсы для строгого контроля типов (TypeScript)
// authApi.ts
export interface LoginResponse {
   token: string;
   user: {
      id: number;
      role_id: number;
      name: string;
      email: string;
      date_birth: Date;
      phone: string;
      avatar: string;
      is_deleted: boolean;
      created_at: Date;
      updated_at: Date;
   };
   success: boolean
};

// authSlice
export interface AuthState {
   token: string | null;
   user: any | null;
   isAuthenticated: boolean;
   isInitialLoading: boolean; // Флаг проверки токена при старте
}