import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Candidates from "./pages/Candidates";
import Insights from "./pages/Insights";
import ChatbotPage from "./pages/ChatbotPage";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import CreateJob from "./pages/CreateJob";
import AddCandidate from "./pages/AddCandidate";
import Messages from "./pages/Messages";
import Calendar from "./pages/Calendar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          
          {/* Routes that use MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/create" element={<CreateJob />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/candidates/add" element={<AddCandidate />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/calendar" element={<Calendar />} />
          </Route>
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;