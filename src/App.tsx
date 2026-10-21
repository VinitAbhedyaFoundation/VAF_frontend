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
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
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
  () => import("./pages/SuperAdminDashboard")
);

// Change this path to match your actual logo file.
const LOGO_SRC = "/images/VinitAbhedya/Logo.png";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

type Role = "User" | "Admin" | "SuperAdmin";

type AuthState = {
  role: Role | null;
  loading: boolean;
};

const VALID_ROLES: Role[] = ["User", "Admin", "SuperAdmin"];

// FULL-SCREEN CUSTOM LOADING SCREEN
function LoadingScreen({
  message = "Preparing your experience",
}: {
  message?: string;
}) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex min-h-screen w-full items-center justify-center bg-white px-4"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="flex flex-col items-center justify-center text-center">
        {/* Centered VAF logo */}
        <div className="relative mb-7 flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40">
          {/* Animated ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-green-100 border-t-green-600" />

          {/* Logo */}
          <div className="flex h-28 w-28 items-center justify-center sm:h-36 sm:w-36">
            <img
              src={LOGO_SRC}
              alt="Vinit Abhedya Foundation logo"
              className="h-full w-full object-contain"
              onError={(event) => {
                // Graceful fallback if the logo path is incorrect.
                event.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>

        <h1 className="text-lg font-bold tracking-wide text-gray-900 sm:text-xl">
          Vinit Abhedya Foundation
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          {message}
        </p>

        {/* Loading indicator */}
        <div className="mt-6 h-1 w-40 overflow-hidden rounded-full bg-green-100">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-green-600" />
        </div>
      </div>
    </div>
  );
}

// AUTHENTICATION
function useAuthRole() {
  const [auth, setAuth] = useState<AuthState>({
    role: null,
    loading: true,
  });

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

        if (active) {
          setAuth({
            role: VALID_ROLES.includes(role) ? role : null,
            loading: false,
          });
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
  }, []);

  return auth;
}

// PROTECTED ROUTES
function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles?: Role[];
}) {
  const location = useLocation();
  const auth = useAuthRole();

  if (auth.loading) {
    return (
      <LoadingScreen message="Verifying your session..." />
    );
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

  if (allowedRoles && !allowedRoles.includes(auth.role)) {
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

// APP
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UIToaster />
        <Sonner />
        <HotToaster position="top-right" />

        <Suspense
          fallback={
            <LoadingScreen message="Loading page..." />
          }
        >
          <Routes>
            {/* CORE */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* USER DASHBOARD */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["User"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* ADMIN DASHBOARD */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute
                  allowedRoles={["Admin", "SuperAdmin"]}
                >
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* SUPER ADMIN DASHBOARD */}
            <Route
              path="/superadmin-dashboard"
              element={
                <ProtectedRoute allowedRoles={["SuperAdmin"]}>
                  <SuperAdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* STATIC PAGES */}
            <Route
              path="/privacy-policy"
              element={<PrivacyPolicy />}
            />
            <Route path="/ploggers" element={<PloggersPage />} />
            <Route
              path="/social-shelf"
              element={<SocialShelfPage />}
            />
            <Route
              path="/laal-bindi"
              element={<LaalBindiPage />}
            />
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