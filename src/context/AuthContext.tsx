
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, Professional } from '@/types/professional';
import { toast } from '@/components/ui/sonner';
import { findProfessionalByCredentials, isNearHospital } from '@/services/authService';
import { requestGeolocation } from '@/hooks/useGeolocation';

type AuthContextType = {
  authState: AuthState;
  login: (email: string, password: string, position: GeolocationPosition | null) => Promise<boolean>;
  logout: () => void;
  verifyLocationAndLogin: (email: string, password: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    professional: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    // Check if there's a saved login
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        setAuthState({
          isAuthenticated: true,
          professional: parsedAuth.professional,
          loading: false,
          error: null,
        });
      } catch (error) {
        localStorage.removeItem('auth');
      }
    }
  }, []);

  const verifyLocationAndLogin = async (email: string, password: string): Promise<boolean> => {
    setAuthState({ ...authState, loading: true, error: null });
    
    try {
      // Request user location
      const position = await requestGeolocation();
      return login(email, password, position);
    } catch (error) {
      // If there's an error getting the location
      setAuthState({
        ...authState,
        loading: false,
        error: 'Unable to get your location or you denied access. Please enable location.'
      });
      toast.error('Location error', {
        description: 'Unable to get your location or you denied access.'
      });
      return false;
    }
  };

  const login = async (email: string, password: string, position: GeolocationPosition | null): Promise<boolean> => {
    setAuthState({ ...authState, loading: true, error: null });
    
    try {
      // Check location if position is provided
      if (position) {
        const nearHospital = isNearHospital(position);
        if (!nearHospital) {
          setAuthState({
            ...authState,
            loading: false,
            error: 'You are not near the hospital. Access denied.'
          });
          toast.error('Access denied', {
            description: 'You are not near the hospital.'
          });
          return false;
        }
      }
      
      // Verify credentials
      const professional = findProfessionalByCredentials(email, password);

      if (!professional) {
        setAuthState({
          ...authState,
          loading: false,
          error: 'Incorrect email or password'
        });
        toast.error('Login failed', {
          description: 'Incorrect email or password.'
        });
        return false;
      }

      // Successful login
      // Remove password from professional object before storing in state
      const { password: _, ...professionalWithoutPassword } = professional;
      
      const newAuthState: AuthState = {
        isAuthenticated: true,
        professional: professionalWithoutPassword,
        loading: false,
        error: null,
      };
      
      setAuthState(newAuthState);
      localStorage.setItem('auth', JSON.stringify(newAuthState));
      
      toast.success('Login successful', {
        description: `Welcome, ${professional.name}!`
      });
      return true;
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: 'Error processing login'
      });
      toast.error('Error', {
        description: 'An error occurred while processing login.'
      });
      return false;
    }
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      professional: null,
      loading: false,
      error: null,
    });
    localStorage.removeItem('auth');
    toast.info('Logout successful', {
      description: 'You have been successfully logged out.'
    });
  };

  const value = {
    authState,
    login,
    logout,
    verifyLocationAndLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
