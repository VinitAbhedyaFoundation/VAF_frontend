import { useEffect, useState } from "react";
import { Toaster as UIToaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster as HotToaster } from "react-hot-toast";
import API from "./api/api";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PloggersPage from "./pages/Ploggers";
import SocialShelfPage from "./pages/SocialShelf";
import LaalBindiPage from "./pages/LaalBindi";
import GalleryPage from "./components/Ploggers/GalleryPage";
import NewsletterSuccess from "./pages/Newsletter";
import Donate from "./pages/donate";

// BLOG
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

// AUTH
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// DASHBOARDS
import Dashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/Dashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";

const queryClient = new QueryClient();

// AUTH CHECK
function isLoggedIn() {
  const token = localStorage.getItem("token");
  return token && token !== "undefined";
}

// BASIC PROTECTION
function ProtectedRoute({ children }: { children: JSX.Element }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// ROLE PROTECTION
function RoleRoute({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: JSX.Element;
}) {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        // Get the actual role from the authenticated backend user.
        // Do NOT trust localStorage.role.
        const response = await API.get("/auth/me");
        setRole(response.data.role);
      } catch (error) {
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  // Wait until the backend confirms the user's role.
  if (loading) {
    return null;
  }

  // User's actual backend role is not authorized.
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function AdminRoute({ children }: { children: JSX.Element }) {
  return (
    <RoleRoute allowedRoles={["Admin", "SuperAdmin"]}>
      {children}
    </RoleRoute>
  );
}

function SuperAdminRoute({ children }: { children: JSX.Element }) {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await API.get("/auth/me");
        setRole(response.data.role);
      } catch {
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  if (loading) {
    return null;
  }

  if (role === "SuperAdmin") {
    return children;
  }

  if (role === "Admin") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return <Navigate to="/dashboard" replace />;
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

        {/* ADMIN DASHBOARD */}
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

        {/* SUPER ADMIN DASHBOARD */}
        <Route
          path="/superadmin-dashboard"
          element={
            <ProtectedRoute>
              <SuperAdminRoute>
                <SuperAdminDashboard />
              </SuperAdminRoute>
            </ProtectedRoute>
          }
        />

        {/* STATIC */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/ploggers" element={<PloggersPage />} />
        <Route path="/social-shelf" element={<SocialShelfPage />} />
        <Route path="/laal-bindi" element={<LaalBindiPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route
          path="/newsletter-success"
          element={<NewsletterSuccess />}
        />
        <Route path="/donate" element={<Donate />} />

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