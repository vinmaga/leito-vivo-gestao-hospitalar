import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertTriangle, ArrowUp, ArrowDown, Search, User } from "lucide-react";
import { getWaitingList, updateWaitingList, WaitingPatient } from "@/services/waitingListService";
import { useNavigate } from "react-router-dom";

interface WaitingPatient {
  id: string;
  name: string;
  age: number;
  department: string;
  priority: "normal" | "urgent" | "emergency";
  waitingSince: string;
  timeWaiting: string;
  diagnosis: string;
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "emergency":
      return (
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emergency text-emergency-foreground animate-pulse-light">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Emergency
        </div>
      );
    case "urgent":
      return (
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-occupied text-occupied-foreground">
          Urgent
        </div>
      );
    default:
      return (
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
          Normal
        </div>
      );
  }
};

const WaitingList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [waitingPatients, setWaitingPatients] = useState<WaitingPatient[]>([]);
  const navigate = useNavigate();

  // Load waiting list from service
  useEffect(() => {
    const loadWaitingList = () => {
      const list = getWaitingList();
      
      // Update time waiting for each patient
      const updatedList = list.map(patient => {
        const admissionTime = new Date(patient.waitingSince.replace(' ', 'T'));
        const currentTime = new Date();
        const diffMs = currentTime.getTime() - admissionTime.getTime();
        
        const diffMins = Math.floor(diffMs / 60000);
        const hours = Math.floor(diffMins / 60);
        const mins = diffMins % 60;
        
        const timeWaiting = hours > 0 
          ? `${hours}h ${mins}min` 
          : `${mins} min`;
          
        return { ...patient, timeWaiting };
      });
      
      setWaitingPatients(updatedList);
      // Save the updated waiting times
      updateWaitingList(updatedList);
    };
    
    loadWaitingList();
    // Update waiting times every minute
    const interval = setInterval(loadWaitingList, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleAddNewPatient = () => {
    navigate('/admissions');
  };
  
  const filteredPatients = waitingPatients.filter(patient => {
    return (
      (searchQuery === "" ||
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterDepartment === "all" || patient.department === filterDepartment) &&
      (filterPriority === "all" || patient.priority === filterPriority)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <h2 className="text-2xl font-bold">Waiting List</h2>
        <div className="flex items-center space-x-2">
          <Button variant="default" onClick={handleAddNewPatient}>Add New Patient</Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-stretch">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, ID, or diagnosis..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="ICU">ICU</SelectItem>
            <SelectItem value="Surgery">Surgery</SelectItem>
            <SelectItem value="Pediatrics">Pediatrics</SelectItem>
            <SelectItem value="General">General</SelectItem>
            <SelectItem value="Maternity">Maternity</SelectItem>
            <SelectItem value="ER">Emergency Room</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="All Priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="emergency">Emergency</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Waiting Time</TableHead>
              <TableHead>Diagnosis</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.id}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-2">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {patient.age} years old
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{patient.department}</TableCell>
                <TableCell>{getPriorityBadge(patient.priority)}</TableCell>
                <TableCell>
                  <div className="font-medium">{patient.timeWaiting}</div>
                  <div className="text-xs text-muted-foreground">
                    Since {patient.waitingSince}
                  </div>
                </TableCell>
                <TableCell>{patient.diagnosis}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button variant="default" size="sm">
                      Assign Bed
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredPatients.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No patients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-between text-sm text-muted-foreground">
        <div>Showing {filteredPatients.length} of {waitingPatients.length} patients</div>
        <div>Updated just now</div>
      </div>
    </div>
  );
};

export default WaitingList;
