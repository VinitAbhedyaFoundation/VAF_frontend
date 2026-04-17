import { Toaster as UIToaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster as HotToaster } from "react-hot-toast";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PloggersPage from "./pages/Ploggers";
import SocialShelfPage from "./pages/SocialShelf";
import LaalBindiPage from "./pages/LaalBindi";
import GalleryPage from "./components/Ploggers/GalleryPage";
import Donate from "./pages/Donate";
import NewsletterSuccess from "./pages/Newsletter";

// BLOG
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

// AUTH
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// DASHBOARDS
import Dashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

// ✅ AUTH CHECK
function isLoggedIn() {
  const token = localStorage.getItem("token");
  return token && token !== "undefined";
}

// ✅ BASIC PROTECTION
function ProtectedRoute({ children }: { children: JSX.Element }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// 🔥 ADMIN PROTECTION (CRITICAL)
function AdminRoute({ children }: { children: JSX.Element }) {
  const role = localStorage.getItem("role");

  if (role !== "Admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UIToaster />
      <Sonner />
      <HotToaster position="top-right" />

      <Routes>
        {/* CORE */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 🔥 ADMIN DASHBOARD */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        {/* STATIC */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/ploggers" element={<PloggersPage />} />
        <Route path="/social-shelf" element={<SocialShelfPage />} />
        <Route path="/laal-bindi" element={<LaalBindiPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/newsletter-success" element={<NewsletterSuccess />} />

        {/* BLOG */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        {/* FALLBACK */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;