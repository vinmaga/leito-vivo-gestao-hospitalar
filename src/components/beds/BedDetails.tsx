
import { AlertTriangle, Calendar, Clock, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Bed } from "./BedMap";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface BedDetailsProps {
  bed: Bed;
  onClose: () => void;
}

const BedDetails = ({ bed, onClose }: BedDetailsProps) => {
  const getBedStatusColor = () => {
    switch (bed.status) {
      case "available":
        return "bg-available text-available-foreground";
      case "occupied":
        return "bg-occupied text-occupied-foreground";
      case "maintenance":
        return "bg-maintenance text-maintenance-foreground";
      case "cleaning":
        return "bg-secondary text-secondary-foreground";
      default:
        return "";
    }
  };

  return (
    <Dialog open={!!bed} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>
              Bed Details: {bed.room}
              <Badge className={`ml-2 ${getBedStatusColor()}`}>
                {bed.status}
              </Badge>
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            {bed.department} • ID: {bed.id}
          </DialogDescription>
        </DialogHeader>

        {bed.status === "occupied" && bed.patientInfo ? (
          <>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Patient Information
                </h3>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{bed.patientInfo.name}</span>
                    <span className="text-muted-foreground">
                      {bed.patientInfo.age} years old
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Diagnosis:
                    </span>{" "}
                    <span>{bed.patientInfo.diagnosis}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Admission Date
                    </div>
                    <div className="font-medium">
                      {bed.patientInfo.admissionDate}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Expected Discharge
                    </div>
                    <div className="font-medium">
                      {bed.patientInfo.expectedDischarge || "Not set"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button variant="default">Manage Patient</Button>
              <Button variant="destructive">Discharge Patient</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div>
              {bed.status === "maintenance" ? (
                <div className="flex items-center space-x-2 p-3 bg-maintenance/30 rounded-md">
                  <AlertTriangle className="h-5 w-5 text-maintenance-foreground" />
                  <span>This bed is currently under maintenance.</span>
                </div>
              ) : bed.status === "cleaning" ? (
                <div className="flex items-center space-x-2 p-3 bg-secondary/30 rounded-md">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span>This bed is currently being cleaned.</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 p-3 bg-available/30 rounded-md">
                  <Check className="h-5 w-5 text-available-foreground" />
                  <span>This bed is available for admission.</span>
                </div>
              )}
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              {bed.status === "available" && (
                <Button>Admit New Patient</Button>
              )}
              {bed.status === "cleaning" && (
                <Button>Mark as Clean</Button>
              )}
              {bed.status === "maintenance" && (
                <Button>Mark as Available</Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BedDetails;
