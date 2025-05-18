
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BedMapPage from "./pages/BedMapPage";
import AdmissionsPage from "./pages/AdmissionsPage";
import WaitingListPage from "./pages/WaitingListPage";
import MaintenancePage from "./pages/MaintenancePage";
import PatientsPage from "./pages/PatientsPage";
import ReportsPage from "./pages/ReportsPage";
import CalendarPage from "./pages/CalendarPage";
import SearchPage from "./pages/SearchPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/beds" element={<BedMapPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/waiting" element={<WaitingListPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
