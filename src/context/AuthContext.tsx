import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, Professional } from '@/types/professional';
import { toast } from '@/components/ui/sonner';

// Dados mockados para demonstração
const mockProfessionals: Professional[] = [
  {
    id: '1',
    name: 'Dr. Santos',
    role: 'Médico',
    email: 'dr.santos@hospital.com',
    password: '123456' // Na prática, seria um hash
  },
  {
    id: '2',
    name: 'Enf. Silva',
    role: 'Enfermeiro',
    email: 'enf.silva@hospital.com',
    password: '123456'
  },
  {
    id: '3',
    name: 'Usuário Teste',
    role: 'Teste',
    email: 'teste@teste.com',
    password: 'teste@teste.som'
  }
];

type AuthContextType = {
  authState: AuthState;
  login: (email: string, password: string, position: GeolocationPosition | null) => Promise<boolean>;
  logout: () => void;
  verifyLocationAndLogin: (email: string, password: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Coordenadas do hospital em Florianópolis/SC
const HOSPITAL_LATITUDE = -27.702067; // Florianópolis/SC
const HOSPITAL_LONGITUDE = -48.509747;
const MAX_DISTANCE_METERS = 500; // Distância máxima permitida em metros

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    professional: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    // Verificar se já existe um login salvo
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

  // Calcula a distância entre duas coordenadas em metros
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // raio da Terra em metros
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance;
  };

  // Verifica se a localização é próxima ao hospital
  const isNearHospital = (position: GeolocationPosition) => {
    const distance = calculateDistance(
      position.coords.latitude,
      position.coords.longitude,
      HOSPITAL_LATITUDE,
      HOSPITAL_LONGITUDE
    );
    
    return distance <= MAX_DISTANCE_METERS;
  };

  const verifyLocationAndLogin = async (email: string, password: string): Promise<boolean> => {
    setAuthState({ ...authState, loading: true, error: null });
    
    try {
      // Solicitar a localização do usuário
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocalização não suportada pelo navegador'));
          return;
        }
        
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });
      
      return login(email, password, position);
    } catch (error) {
      // Se houver erro na obtenção da localização
      setAuthState({
        ...authState,
        loading: false,
        error: 'Não foi possível obter sua localização ou você negou o acesso. Por favor habilite a localização.'
      });
      toast.error('Erro na localização', {
        description: 'Não foi possível obter sua localização ou você negou o acesso.'
      });
      return false;
    }
  };

  const login = async (email: string, password: string, position: GeolocationPosition | null): Promise<boolean> => {
    setAuthState({ ...authState, loading: true, error: null });
    
    try {
      // Verificar a localização se posição foi fornecida
      if (position) {
        const nearHospital = isNearHospital(position);
        if (!nearHospital) {
          setAuthState({
            ...authState,
            loading: false,
            error: 'Você não está nas proximidades do hospital. Acesso negado.'
          });
          toast.error('Acesso negado', {
            description: 'Você não está nas proximidades do hospital.'
          });
          return false;
        }
      }
      
      // Verificar credenciais (simulado)
      const professional = mockProfessionals.find(
        (p) => p.email === email && p.password === password
      );

      if (!professional) {
        setAuthState({
          ...authState,
          loading: false,
          error: 'Email ou senha incorretos'
        });
        toast.error('Falha no login', {
          description: 'Email ou senha incorretos.'
        });
        return false;
      }

      // Login bem-sucedido
      // Removendo a senha do objeto professional antes de armazenar no estado
      const { password: _, ...professionalWithoutPassword } = professional;
      
      const newAuthState: AuthState = {
        isAuthenticated: true,
        professional: professionalWithoutPassword,
        loading: false,
        error: null,
      };
      
      setAuthState(newAuthState);
      localStorage.setItem('auth', JSON.stringify(newAuthState));
      
      toast.success('Login realizado', {
        description: `Bem-vindo, ${professional.name}!`
      });
      return true;
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: 'Erro ao processar login'
      });
      toast.error('Erro', {
        description: 'Ocorreu um erro ao processar o login.'
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
    toast.info('Logout realizado', {
      description: 'Você foi desconectado com sucesso.'
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
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
