
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface DepartmentStatus {
  name: string;
  occupancyRate: number;
}

const departments: DepartmentStatus[] = [
  { name: "ICU", occupancyRate: 90 },
  { name: "Pediatrics", occupancyRate: 40 },
  { name: "Surgery", occupancyRate: 75 },
  { name: "Maternity", occupancyRate: 30 },
  { name: "General", occupancyRate: 60 },
  { name: "ER", occupancyRate: 85 },
];

const getStatusColor = (rate: number) => {
  if (rate >= 85) return "text-status-critical";
  if (rate >= 60) return "text-status-warning";
  return "text-status-ok";
};

const getProgressColor = (rate: number) => {
  if (rate >= 85) return "bg-emergency";
  if (rate >= 60) return "bg-occupied";
  return "bg-available-foreground";
};

const OccupancyStatus = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">
          Department Occupancy Rates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {departments.map((dept) => (
            <div key={dept.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{dept.name}</span>
                <span className={`font-semibold ${getStatusColor(dept.occupancyRate)}`}>
                  {dept.occupancyRate}%
                </span>
              </div>
              <Progress
                value={dept.occupancyRate}
                className={`h-2 ${getProgressColor(dept.occupancyRate)}`}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OccupancyStatus;
