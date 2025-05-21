
export interface Professional {
  id: string;
  name: string;
  role: string;
  email: string;
  password?: string; // Changed to optional with ?
}

export type AuthState = {
  isAuthenticated: boolean;
  professional: Professional | null;
  loading: boolean;
  error: string | null;
};
