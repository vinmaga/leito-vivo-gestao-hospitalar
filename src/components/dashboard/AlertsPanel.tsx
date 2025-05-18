
import { AlertTriangle, Clock, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Alert {
  id: number;
  type: "info" | "warning" | "critical";
  message: string;
  time: string;
}

const alerts: Alert[] = [
  {
    id: 1,
    type: "critical",
    message: "ICU occupancy at 90% - only 2 beds remaining",
    time: "Just now",
  },
  {
    id: 2,
    type: "warning",
    message: "Room 302 cleaning delayed - ETA in 30 minutes",
    time: "10 minutes ago",
  },
  {
    id: 3,
    type: "info",
    message: "5 patients scheduled for discharge today",
    time: "25 minutes ago",
  },
  {
    id: 4,
    type: "info",
    message: "Weekly bed occupancy report available",
    time: "2 hours ago",
  },
];

const getAlertIcon = (type: string) => {
  switch (type) {
    case "critical":
      return <AlertTriangle className="h-5 w-5 text-emergency" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-occupied-foreground" />;
    default:
      return <Info className="h-5 w-5 text-primary" />;
  }
};

const AlertsPanel = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Recent Alerts</CardTitle>
        <span className="inline-flex items-center justify-center w-5 h-5 bg-emergency text-emergency-foreground text-xs font-bold rounded-full">
          {alerts.length}
        </span>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-1">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex gap-3 px-6 py-2 ${
                alert.type === "critical"
                  ? "bg-emergency/10"
                  : alert.type === "warning"
                  ? "bg-occupied/10"
                  : ""
              }`}
            >
              <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
              <div>
                <div className="text-sm">{alert.message}</div>
                <div className="text-xs text-muted-foreground flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  {alert.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
