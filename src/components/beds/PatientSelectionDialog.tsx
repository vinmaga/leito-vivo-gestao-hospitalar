
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getWaitingList, WaitingPatient, updateWaitingList } from "@/services/waitingListService";
import { Badge } from "@/components/ui/badge";

interface PatientSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPatientSelected: (patient: WaitingPatient) => void;
  department: string;
}

const PatientSelectionDialog = ({
  isOpen,
  onClose,
  onPatientSelected,
  department
}: PatientSelectionDialogProps) => {
  const [waitingPatients, setWaitingPatients] = useState<WaitingPatient[]>([]);
  
  useEffect(() => {
    // Get patients from the waiting list
    const patients = getWaitingList();
    
    // Filter by department if needed
    const filteredPatients = department 
      ? patients.filter(p => p.department === department)
      : patients;
      
    setWaitingPatients(filteredPatients);
  }, [department]);
  
  const handleSelectPatient = (patient: WaitingPatient) => {
    // Remove patient from waiting list
    const currentWaitingList = getWaitingList();
    const updatedWaitingList = currentWaitingList.filter(p => p.id !== patient.id);
    updateWaitingList(updatedWaitingList);
    
    // Call the callback with the selected patient
    onPatientSelected(patient);
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "emergency":
        return "bg-destructive text-destructive-foreground";
      case "urgent":
        return "bg-warning text-warning-foreground";
      case "normal":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Select Patient from Waiting List</DialogTitle>
        </DialogHeader>
        
        {waitingPatients.length > 0 ? (
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {waitingPatients.map((patient) => (
              <div 
                key={patient.id}
                className="border rounded-md p-4 hover:bg-accent transition-colors cursor-pointer"
                onClick={() => handleSelectPatient(patient)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {patient.age} years | ID: {patient.id}
                    </p>
                  </div>
                  <Badge className={getPriorityColor(patient.priority)}>
                    {patient.priority}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Diagnosis:</span> {patient.diagnosis}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Waiting since:</span> {patient.waitingSince}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            No patients in the waiting list for {department || "any department"}
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PatientSelectionDialog;
