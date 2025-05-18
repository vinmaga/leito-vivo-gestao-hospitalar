
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { addToWaitingList } from "@/services/waitingListService";
import { useNavigate } from "react-router-dom";

const AdmissionForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dischargeDate, setDischargeDate] = useState<Date | undefined>();
  
  // Form state
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [age, setAge] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [gender, setGender] = useState("");
  const [medicalRecordNumber, setMedicalRecordNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [priority, setPriority] = useState<"normal" | "urgent" | "emergency">("normal");
  const [bedType, setBedType] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [notes, setNotes] = useState("");
  
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleAddToWaitingList = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    addPatientToWaitingList();
    toast({
      title: "Added to waiting list",
      description: `${patientName} has been added to the waiting list.`,
    });
    
    navigate('/waiting');
  };
  
  const validateForm = () => {
    // Simple validation
    if (!patientName || !patientId || !age || !department || !diagnosis) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };
  
  const addPatientToWaitingList = () => {
    addToWaitingList({
      name: patientName,
      age: parseInt(age),
      department,
      priority,
      diagnosis,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    addPatientToWaitingList();
    
    toast({
      title: "Patient admission initiated",
      description: "Admission details sent for processing. Patient added to waiting list.",
    });
    
    navigate('/waiting');
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>New Patient Admission</CardTitle>
          <CardDescription>
            Enter patient details to create a new admission request.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Patient Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                placeholder="Patient Full Name" 
                required 
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
              <Input 
                placeholder="CPF/ID Number" 
                required 
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
              <Input 
                placeholder="Age" 
                type="number" 
                min={0} 
                max={120} 
                required 
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <Input 
                placeholder="Contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
              <Select 
                value={gender} 
                onValueChange={setGender} 
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                placeholder="Medical Record Number"
                value={medicalRecordNumber}
                onChange={(e) => setMedicalRecordNumber(e.target.value)}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Admission Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select 
                value={department} 
                onValueChange={setDepartment} 
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ICU">ICU</SelectItem>
                  <SelectItem value="Surgery">Surgery</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Maternity">Maternity</SelectItem>
                  <SelectItem value="ER">Emergency Room</SelectItem>
                </SelectContent>
              </Select>
              <Select 
                value={priority} 
                onValueChange={(value: "normal" | "urgent" | "emergency") => setPriority(value)} 
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
              <Select 
                value={bedType} 
                onValueChange={setBedType} 
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Bed Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="icu">ICU</SelectItem>
                  <SelectItem value="isolation">Isolation</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                placeholder="Preliminary Diagnosis" 
                required 
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
              />

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Admission Date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dischargeDate ? (
                      format(dischargeDate, "PPP")
                    ) : (
                      <span>Expected Discharge Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dischargeDate}
                    onSelect={setDischargeDate}
                    initialFocus
                    disabled={(currentDate) => 
                      (date && currentDate < date) || 
                      currentDate < new Date()
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Additional Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <Select
                value={insuranceProvider}
                onValueChange={setInsuranceProvider}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Insurance Provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sus">SUS</SelectItem>
                  <SelectItem value="amil">Amil</SelectItem>
                  <SelectItem value="unimed">Unimed</SelectItem>
                  <SelectItem value="bradesco">Bradesco Saúde</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Notes and special requirements"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => navigate('/')}>Cancel</Button>
          <div className="flex space-x-2">
            <Button variant="secondary" type="button" onClick={handleAddToWaitingList}>Add to Waiting List</Button>
            <Button type="submit">Find Available Bed</Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default AdmissionForm;
