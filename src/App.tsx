
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages
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
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Rota pública de login */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Rotas protegidas */}
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/beds" element={
              <ProtectedRoute>
                <BedMapPage />
              </ProtectedRoute>
            } />
            <Route path="/admissions" element={
              <ProtectedRoute>
                <AdmissionsPage />
              </ProtectedRoute>
            } />
            <Route path="/waiting" element={
              <ProtectedRoute>
                <WaitingListPage />
              </ProtectedRoute>
            } />
            <Route path="/maintenance" element={
              <ProtectedRoute>
                <MaintenancePage />
              </ProtectedRoute>
            } />
            <Route path="/patients" element={
              <ProtectedRoute>
                <PatientsPage />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <ReportsPage />
              </ProtectedRoute>
            } />
            <Route path="/calendar" element={
              <ProtectedRoute>
                <CalendarPage />
              </ProtectedRoute>
            } />
            <Route path="/search" element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            } />
            
            {/* Fallback 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
