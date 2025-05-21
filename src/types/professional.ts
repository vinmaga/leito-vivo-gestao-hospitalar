
export interface Professional {
  id: string;
  name: string;
  role: string;
  email: string;
  password: string; // Na prática, seria um hash
}

export type AuthState = {
  isAuthenticated: boolean;
  professional: Professional | null;
  loading: boolean;
  error: string | null;
};
