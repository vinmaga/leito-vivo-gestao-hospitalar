
import { Professional } from '@/types/professional';

// Mockup data for demonstration purposes
export const mockProfessionals: Professional[] = [
  {
    id: '1',
    name: 'Dr. Santos',
    role: 'Médico',
    email: 'dr.santos@hospital.com',
    password: '123456' // In practice, this would be a hash
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
    password: 'teste'
  }
];

// Coordinates of the hospital in Florianópolis/SC
const HOSPITAL_LATITUDE = -27.702067; // Florianópolis/SC
const HOSPITAL_LONGITUDE = -48.509747;
const MAX_DISTANCE_METERS = 500; // Maximum allowed distance in meters

// Calculate distance between two coordinates in meters
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371e3; // Earth's radius in meters
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

// Check if the location is near the hospital
export const isNearHospital = (position: GeolocationPosition): boolean => {
  const distance = calculateDistance(
    position.coords.latitude,
    position.coords.longitude,
    HOSPITAL_LATITUDE,
    HOSPITAL_LONGITUDE
  );
  
  return distance <= MAX_DISTANCE_METERS;
};

// Find professional by email and password
export const findProfessionalByCredentials = (email: string, password: string): Professional | undefined => {
  return mockProfessionals.find(
    (p) => p.email === email && p.password === password
  );
};
