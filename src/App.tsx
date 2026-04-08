import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      {/* ✅ NO BrowserRouter HERE */}
      <Routes>
        <Route path="/" element={<Index />} />
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

        <Route path="*" element={<NotFound />} />
      </Routes>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;