
import { AlertTriangle, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface WaitingPatient {
  id: string;
  name: string;
  timeWaiting: string;
  priority: "normal" | "urgent" | "emergency";
  department: string;
}

const patients: WaitingPatient[] = [
  {
    id: "P-4392",
    name: "Ana Silva",
    timeWaiting: "45 min",
    priority: "emergency",
    department: "ICU",
  },
  {
    id: "P-4391",
    name: "João Oliveira",
    timeWaiting: "2h 10min",
    priority: "urgent",
    department: "Surgery",
  },
  {
    id: "P-4390",
    name: "Maria Santos",
    timeWaiting: "3h 25min",
    priority: "normal",
    department: "General",
  },
  {
    id: "P-4389",
    name: "Pedro Costa",
    timeWaiting: "4h 05min",
    priority: "normal",
    department: "Pediatrics",
  },
];

const getPriorityStyle = (priority: string) => {
  switch (priority) {
    case "emergency":
      return "bg-emergency text-emergency-foreground animate-pulse-light";
    case "urgent":
      return "bg-occupied text-occupied-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const WaitingListPreview = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Waiting List</CardTitle>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-2">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="flex items-center justify-between px-6 py-2 border-b last:border-0"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`${getPriorityStyle(
                    patient.priority
                  )} w-2 h-2 rounded-full`}
                />
                <div>
                  <div className="font-medium">{patient.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {patient.id} • {patient.department}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {patient.timeWaiting}
                </div>
                {patient.priority === "emergency" && (
                  <AlertTriangle className="h-4 w-4 text-emergency" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <div className="text-xs text-muted-foreground">4 patients waiting</div>
        <Button variant="ghost" size="sm" className="text-xs flex items-center">
          View all <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WaitingListPreview;
