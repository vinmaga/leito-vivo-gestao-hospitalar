
import { Bed } from "./BedMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock } from "lucide-react";

interface BedGridProps {
  title: string;
  beds: Bed[];
  onBedClick: (bed: Bed) => void;
}

const BedStatus = ({ status }: { status: Bed["status"] }) => {
  const getStatusInfo = () => {
    switch (status) {
      case "available":
        return {
          bgColor: "bg-available",
          textColor: "text-available-foreground",
          icon: <Check className="h-3 w-3" />,
        };
      case "occupied":
        return {
          bgColor: "bg-occupied",
          textColor: "text-occupied-foreground",
          icon: null,
        };
      case "maintenance":
        return {
          bgColor: "bg-maintenance",
          textColor: "text-maintenance-foreground",
          icon: null,
        };
      case "cleaning":
        return {
          bgColor: "bg-secondary",
          textColor: "text-secondary-foreground",
          icon: <Clock className="h-3 w-3" />,
        };
      default:
        return {
          bgColor: "bg-secondary",
          textColor: "text-secondary-foreground",
          icon: null,
        };
    }
  };

  const { bgColor, textColor, icon } = getStatusInfo();

  return (
    <div className={`${bgColor} ${textColor} p-1 rounded-sm flex items-center justify-center text-xs uppercase tracking-wider font-semibold`}>
      {icon && <span className="mr-1">{icon}</span>}
      {status}
    </div>
  );
};

const BedGrid = ({ title, beds, onBedClick }: BedGridProps) => {
  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <div className="flex text-xs space-x-2 text-muted-foreground">
          <span>Total: {beds.length}</span>
          <span>•</span>
          <span>Available: {beds.filter(b => b.status === "available").length}</span>
          <span>•</span>
          <span>Occupied: {beds.filter(b => b.status === "occupied").length}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-2">
          {beds.map((bed) => (
            <div
              key={bed.id}
              className="p-2 border rounded-md cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onBedClick(bed)}
            >
              <div className="text-sm font-medium mb-1">{bed.room}</div>
              <BedStatus status={bed.status} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BedGrid;
