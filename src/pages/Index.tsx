
import { Bed, Calendar, Check, Clock, User } from "lucide-react";
import Layout from "@/components/layout/Layout";
import StatusCard from "@/components/dashboard/StatusCard";
import OccupancyChart from "@/components/dashboard/OccupancyChart";
import WaitingListPreview from "@/components/dashboard/WaitingListPreview";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import OccupancyStatus from "@/components/dashboard/OccupancyStatus";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BedMap from "@/components/beds/BedMap";
import AdmissionForm from "@/components/admission/AdmissionForm";
import WaitingList from "@/components/waitinglist/WaitingList";
import { useState } from "react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <Layout>
      <div className="space-y-6">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 md:w-fit">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="beds">Bed Map</TabsTrigger>
            <TabsTrigger value="admission">Admission</TabsTrigger>
            <TabsTrigger value="waiting">Waiting List</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatusCard
                title="Total Beds"
                value="250"
                icon={<Bed className="h-4 w-4" />}
              />
              <StatusCard
                title="Available Beds"
                value="58"
                icon={<Check className="h-4 w-4" />}
                color="available"
                trend={{ value: "4 since yesterday", positive: true }}
              />
              <StatusCard
                title="Occupied Beds"
                value="176"
                icon={<User className="h-4 w-4" />}
                color="occupied"
                trend={{ value: "2 since yesterday", positive: false }}
              />
              <StatusCard
                title="In Cleaning"
                value="16"
                icon={<Clock className="h-4 w-4" />}
                color="maintenance"
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <OccupancyChart />
              <div className="space-y-6">
                <WaitingListPreview />
                <AlertsPanel />
              </div>
            </div>
            
            <div className="mt-6">
              <OccupancyStatus />
            </div>
          </TabsContent>
          
          <TabsContent value="beds">
            <BedMap />
          </TabsContent>
          
          <TabsContent value="admission">
            <AdmissionForm />
          </TabsContent>
          
          <TabsContent value="waiting">
            <WaitingList />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Index;
