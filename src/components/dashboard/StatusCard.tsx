
import { ReactNode } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string;
    positive?: boolean;
  };
  color?: "available" | "occupied" | "maintenance" | "emergency" | "default";
}

const StatusCard = ({ title, value, icon, trend, color = "default" }: StatusCardProps) => {
  const colorClasses = {
    available: "bg-available text-available-foreground",
    occupied: "bg-occupied text-occupied-foreground",
    maintenance: "bg-maintenance text-maintenance-foreground",
    emergency: "bg-emergency text-emergency-foreground",
    default: "bg-card",
  };

  return (
    <Card className={`${color !== "default" ? colorClasses[color] : ""} border`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          {title}
          <span className="p-2 bg-white bg-opacity-30 rounded-md">
            {icon}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
      {trend && (
        <CardFooter className="pt-0 text-xs">
          <span className={trend.positive ? "text-available-foreground" : "text-emergency-foreground"}>
            {trend.positive ? "↑" : "↓"} {trend.value}
          </span>
        </CardFooter>
      )}
    </Card>
  );
};

export default StatusCard;
