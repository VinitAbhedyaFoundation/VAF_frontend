
import {
  lazy,
  Suspense,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as UIToaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as HotToaster } from "react-hot-toast";
import API from "./api/api";

// CORE
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

// STATIC PAGES
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const PloggersPage = lazy(() => import("./pages/Ploggers"));
const SocialShelfPage = lazy(() => import("./pages/SocialShelf"));
const LaalBindiPage = lazy(() => import("./pages/LaalBindi"));
const GalleryPage = lazy(() => import("./components/Ploggers/GalleryPage"));
const NewsletterSuccess = lazy(() => import("./pages/Newsletter"));
const Donate = lazy(() => import("./pages/donate"));

// BLOG
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

// AUTH
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

// DASHBOARDS
const Dashboard = lazy(() => import("./pages/UserDashboard"));
const AdminDashboard = lazy(() => import("./pages/Dashboard"));
const SuperAdminDashboard = lazy(
  () => import("./pages/SuperAdminDashboard"),
);

const queryClient = new QueryClient();

type Role = "User" | "Admin" | "SuperAdmin";

type AuthState = {
  role: Role | null;
  loading: boolean;
};

function LoadingScreen() {
  return (
    <div
      className="flex min-h-[40vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <span className="text-sm text-muted-foreground">
        Loading...
      </span>
    </div>
  );
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    role: null,
    loading: true,
  });
  const location = useLocation();

  useEffect(() => {
    let active = true;

    const verifySession = async () => {
      const token = localStorage.getItem("token");

      if (!token || token === "undefined" || token === "null") {
        if (active) {
          setAuth({ role: null, loading: false });
        }
        return;
      }

      try {
        const response = await API.get("/auth/me");
        const role = response.data?.role;

        if (
          active &&
          (role === "User" || role === "Admin" || role === "SuperAdmin")
        ) {
          setAuth({ role, loading: false });
        } else if (active) {
          setAuth({ role: null, loading: false });
        }
      } catch {
        if (active) {
          setAuth({ role: null, loading: false });
        }
      }
    };

    setAuth({ role: null, loading: true });
    void verifySession();

    return () => {
      active = false;
    };
  }, [location.pathname]);

  if (auth.loading) {
    return <LoadingScreen />;
  }

  if (!auth.role) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}

function RoleRoute({
  allowedRoles,
  children,
}: {
  allowedRoles: Role[];
  children: ReactNode;
}) {
  const [auth, setAuth] = useState<AuthState>({
    role: null,
    loading: true,
  });

  useEffect(() => {
    let active = true;

    const fetchRole = async () => {
      try {
        const response = await API.get("/auth/me");
        const role = response.data?.role;

        if (
          active &&
          (role === "User" || role === "Admin" || role === "SuperAdmin")
        ) {
          setAuth({ role, loading: false });
        } else if (active) {
          setAuth({ role: null, loading: false });
        }
      } catch {
        if (active) {
          setAuth({ role: null, loading: false });
        }
      }
    };

    void fetchRole();

    return () => {
      active = false;
    };
  }, []);

  if (auth.loading) {
    return <LoadingScreen />;
  }

  if (!auth.role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(auth.role)) {
    if (auth.role === "SuperAdmin") {
      return <Navigate to="/superadmin-dashboard" replace />;
    }

    if (auth.role === "Admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function AdminRoute({ children }: { children: ReactNode }) {
  return (
    <RoleRoute allowedRoles={["Admin", "SuperAdmin"]}>
      {children}
    </RoleRoute>
  );
}

function SuperAdminRoute({ children }: { children: ReactNode }) {
  return (
    <RoleRoute allowedRoles={["SuperAdmin"]}>
      {children}
    </RoleRoute>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UIToaster />
        <Sonner />
        <HotToaster position="top-right" />

        <Suspense fallback={<LoadingScreen />}>
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
                  <RoleRoute allowedRoles={["User"]}>
                    <Dashboard />
                  </RoleRoute>
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
        </Suspense>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
