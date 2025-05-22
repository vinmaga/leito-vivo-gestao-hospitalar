
import { Bed } from "@/components/beds/BedMap";

// Storage key for bed data
const STORAGE_KEY = 'hospital_bed_data';

// Departments configuration
export const departments = [
  { id: "icu", name: "ICU", floor: "floor1" },
  { id: "surgery", name: "Surgery", floor: "floor1" },
  { id: "pediatrics", name: "Pediatrics", floor: "floor2" },
  { id: "general", name: "General", floor: "floor2" },
  { id: "maternity", name: "Maternity", floor: "floor3" },
  { id: "er", name: "Emergency Room", floor: "floor3" },
];

// Generate initial bed data if not present in localStorage
export const generateInitialBeds = (): Bed[] => {
  const statuses: Array<"available" | "occupied" | "maintenance" | "cleaning"> = [
    "available",
    "occupied",
    "maintenance",
    "cleaning",
  ];
  
  const beds: Bed[] = [];
  
  departments.forEach((dept) => {
    const bedCount = dept.id === "icu" ? 20 : 30;
    
    for (let i = 1; i <= bedCount; i++) {
      const status = statuses[Math.floor(Math.random() * (statuses.length - (dept.id === "icu" ? 0.5 : 0)))];
      
      const bed: Bed = {
        id: `${dept.id}-${i}`,
        room: `${dept.id.toUpperCase()}-${Math.floor((i - 1) / 2) + 1}${i % 2 ? 'A' : 'B'}`,
        status,
        department: dept.name,
      };
      
      if (status === "occupied") {
        const names = ["João Silva", "Maria Santos", "Pedro Oliveira", "Ana Costa", "Carlos Pereira"];
        const diagnoses = ["Pneumonia", "Post-surgery recovery", "Heart condition", "Fracture", "COVID-19"];
        
        const admissionDate = new Date();
        admissionDate.setDate(admissionDate.getDate() - Math.floor(Math.random() * 10));
        
        const dischargeDate = new Date();
        dischargeDate.setDate(admissionDate.getDate() + Math.floor(Math.random() * 10) + 3);
        
        bed.patientInfo = {
          name: names[Math.floor(Math.random() * names.length)],
          age: Math.floor(Math.random() * 70) + 10,
          diagnosis: diagnoses[Math.floor(Math.random() * diagnoses.length)],
          admissionDate: admissionDate.toLocaleDateString('pt-BR'),
          expectedDischarge: dischargeDate.toLocaleDateString('pt-BR'),
        };
      }
      
      beds.push(bed);
    }
  });
  
  return beds;
};

// Get all beds
export const getAllBeds = (): Bed[] => {
  const storedBeds = localStorage.getItem(STORAGE_KEY);
  if (storedBeds) {
    return JSON.parse(storedBeds);
  }
  
  // If no beds in storage, generate initial data and save it
  const initialBeds = generateInitialBeds();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBeds));
  
  return initialBeds;
};

// Get beds for a specific department
export const getDepartmentBeds = (department: string): Bed[] => {
  const allBeds = getAllBeds();
  return allBeds.filter(bed => bed.department === department);
};

// Update a bed's status
export const updateBedStatus = (
  bedId: string, 
  status: "available" | "occupied" | "maintenance" | "cleaning",
  patientInfo?: {
    name: string;
    age: number;
    diagnosis: string;
    admissionDate: string;
    expectedDischarge?: string;
  }
): Bed[] => {
  const allBeds = getAllBeds();
  
  const updatedBeds = allBeds.map(bed => {
    if (bed.id === bedId) {
      return {
        ...bed,
        status,
        patientInfo: status === "occupied" ? patientInfo || bed.patientInfo : undefined
      };
    }
    return bed;
  });
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBeds));
  
  return updatedBeds;
};
