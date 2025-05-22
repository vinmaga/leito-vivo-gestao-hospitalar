
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BedGrid from "./BedGrid";
import BedDetails from "./BedDetails";
import { getAllBeds, departments } from "@/services/bedService";

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

const BedMap = () => {
  const [activeFloor, setActiveFloor] = useState(floors[0].id);
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
  const [beds, setBeds] = useState<Bed[]>([]);
  
  // Load beds from service
  useEffect(() => {
    loadBeds();
  }, []);
  
  const loadBeds = () => {
    setBeds(getAllBeds());
  };
  
  const handleBedClick = (bed: Bed) => {
    setSelectedBed(bed);
  };
  
  const handleDialogClose = () => {
    // Refresh beds data when dialog closes to ensure we have the latest data
    loadBeds();
    setSelectedBed(null);
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
              beds={beds.filter(bed => bed.department === dept.name)}
              onBedClick={handleBedClick}
            />
          ))}
      </div>

      {selectedBed && (
        <BedDetails bed={selectedBed} onClose={handleDialogClose} />
      )}
    </div>
  );
};

export default BedMap;
