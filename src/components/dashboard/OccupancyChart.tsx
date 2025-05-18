
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface OccupancyDataItem {
  name: string;
  available: number;
  occupied: number;
  maintenance: number;
}

const data: OccupancyDataItem[] = [
  {
    name: "ICU",
    available: 4,
    occupied: 18,
    maintenance: 2,
  },
  {
    name: "Pediatrics",
    available: 12,
    occupied: 8,
    maintenance: 1,
  },
  {
    name: "Surgery",
    available: 6,
    occupied: 12,
    maintenance: 0,
  },
  {
    name: "Maternity",
    available: 14,
    occupied: 6,
    maintenance: 0,
  },
  {
    name: "General",
    available: 22,
    occupied: 30,
    maintenance: 4,
  },
  {
    name: "ER",
    available: 2,
    occupied: 12,
    maintenance: 1,
  },
];

const OccupancyChart = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Bed Occupancy by Department</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 20,
              }}
              stackOffset="expand"
              barSize={30}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value, name) => [`${value} beds`, name]} />
              <Legend />
              <Bar
                dataKey="occupied"
                name="Occupied"
                stackId="stack"
                fill="hsl(var(--occupied))"
                stroke="hsl(var(--occupied-foreground))"
                strokeWidth={1}
              />
              <Bar
                dataKey="available"
                name="Available"
                stackId="stack"
                fill="hsl(var(--available))"
                stroke="hsl(var(--available-foreground))"
                strokeWidth={1}
              />
              <Bar
                dataKey="maintenance"
                name="Maintenance"
                stackId="stack"
                fill="hsl(var(--maintenance))"
                stroke="hsl(var(--maintenance-foreground))"
                strokeWidth={1}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default OccupancyChart;
