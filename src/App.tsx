
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HomePage from "./pages/HomePage";
import Onboarding from "./pages/Onboarding";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import StepFive from "./components/onboarding/StepFive";
import { OnboardingProvider } from "./contexts/OnboardingContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const queryClient = new QueryClient();

const CompletePage = () => (
  <div className="min-h-screen flex flex-col bg-gray-50/50">
    <header className="bg-white py-4 px-6 border-b border-gray-100/70">
      <div className="container mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl font-bold text-brand-blue"
        >
          <Link to="/">Spyer.app</Link>
        </motion.div>
      </div>
    </header>
    
    <main className="flex-grow flex items-center justify-center py-8">
      <OnboardingProvider>
        <StepFive />
      </OnboardingProvider>
    </main>
    
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Spyer.app. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/onboarding/complete" element={<CompletePage />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
