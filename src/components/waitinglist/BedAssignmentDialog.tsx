
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WaitingPatient } from "@/services/waitingListService";
import { AlertTriangle, Clock, Check, X } from "lucide-react";
import { toast } from "sonner";

interface Bed {
  id: string;
  room: string;
  status: "available" | "occupied" | "maintenance" | "cleaning";
  department: string;
}

interface BedAssignmentDialogProps {
  patient: WaitingPatient | null;
  isOpen: boolean;
  onClose: () => void;
}

// Sample bed data - in a real application, this would come from an API
const generateBeds = (department: string): Bed[] => {
  const beds: Bed[] = [];
  const statuses: Array<"available" | "occupied" | "maintenance" | "cleaning"> = [
    "available",
    "occupied",
    "maintenance",
    "cleaning",
  ];
  
  // Generate 15 beds for the department
  for (let i = 1; i <= 15; i++) {
    // Make 40% of the beds available to ensure there are options
    const status = i % 3 === 0 || i % 5 === 0 ? "available" : statuses[Math.floor(Math.random() * statuses.length)];
    
    beds.push({
      id: `${department.toLowerCase().replace(/\s/g, "-")}-${i}`,
      room: `${department.substring(0, 3).toUpperCase()}-${Math.floor((i - 1) / 2) + 1}${i % 2 ? 'A' : 'B'}`,
      status,
      department,
    });
  }
  
  return beds;
};

const BedStatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "available":
      return <Check className="h-4 w-4 text-available" />;
    case "occupied":
      return <X className="h-4 w-4 text-occupied" />;
    case "maintenance":
      return <AlertTriangle className="h-4 w-4 text-maintenance" />;
    case "cleaning":
      return <Clock className="h-4 w-4 text-secondary-foreground" />;
    default:
      return null;
  }
};

export function BedAssignmentDialog({ patient, isOpen, onClose }: BedAssignmentDialogProps) {
  const [beds, setBeds] = useState<Bed[]>([]);

  useEffect(() => {
    if (patient && patient.department) {
      // In a real app, you would fetch available beds from an API
      const departmentBeds = generateBeds(patient.department);
      setBeds(departmentBeds);
    }
  }, [patient]);

  const handleAssignBed = (bed: Bed) => {
    if (bed.status !== "available") {
      toast.error("Cannot assign patient to unavailable bed");
      return;
    }

    toast.success(`Patient ${patient?.name} assigned to bed ${bed.room}`, {
      description: "Patient will be moved shortly",
    });
    onClose();
  };

  const availableBeds = beds.filter((bed) => bed.status === "available");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Bed for {patient?.name}</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">
            Available beds in {patient?.department}
          </h3>
          
          {availableBeds.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {beds.map((bed) => (
                <div
                  key={bed.id}
                  className={`p-3 border rounded-md flex flex-col items-center cursor-pointer transition-colors ${
                    bed.status === "available"
                      ? "hover:border-primary hover:bg-primary/5"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() => bed.status === "available" && handleAssignBed(bed)}
                >
                  <div className="flex items-center justify-center mb-1">
                    <BedStatusIcon status={bed.status} />
                  </div>
                  <div className="font-medium text-center">{bed.room}</div>
                  <div className="text-xs capitalize text-muted-foreground">
                    {bed.status}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-6 text-muted-foreground">
              No available beds in this department
            </div>
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BedAssignmentDialog;
