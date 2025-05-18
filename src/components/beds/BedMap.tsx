
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BedGrid from "./BedGrid";
import BedDetails from "./BedDetails";

export interface Bed {
  id: string;
  room: string;
  status: "available" | "occupied" | "maintenance" | "cleaning";
  department: string;
  patientInfo?: {
    name: string;
    age: number;
    diagnosis: string;
    admissionDate: string;
    expectedDischarge?: string;
  };
}

const floors = [
  { id: "floor1", name: "Floor 1" },
  { id: "floor2", name: "Floor 2" },
  { id: "floor3", name: "Floor 3" },
];

const departments = [
  { id: "icu", name: "ICU", floor: "floor1" },
  { id: "surgery", name: "Surgery", floor: "floor1" },
  { id: "pediatrics", name: "Pediatrics", floor: "floor2" },
  { id: "general", name: "General", floor: "floor2" },
  { id: "maternity", name: "Maternity", floor: "floor3" },
  { id: "er", name: "Emergency Room", floor: "floor3" },
];

// Sample bed data
const generateBeds = (): Bed[] => {
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

const bedData = generateBeds();

const BedMap = () => {
  const [activeFloor, setActiveFloor] = useState(floors[0].id);
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
  
  const handleBedClick = (bed: Bed) => {
    setSelectedBed(bed);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <h2 className="text-2xl font-bold">Hospital Bed Map</h2>
        <Tabs value={activeFloor} onValueChange={setActiveFloor} className="w-[400px]">
          <TabsList>
            {floors.map(floor => (
              <TabsTrigger key={floor.id} value={floor.id} className="flex-1">
                {floor.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {departments
          .filter(dept => dept.floor === activeFloor)
          .map(dept => (
            <BedGrid
              key={dept.id}
              title={dept.name}
              beds={bedData.filter(bed => bed.department === dept.name)}
              onBedClick={handleBedClick}
            />
          ))}
      </div>

      {selectedBed && (
        <BedDetails bed={selectedBed} onClose={() => setSelectedBed(null)} />
      )}
    </div>
  );
};

export default BedMap;
