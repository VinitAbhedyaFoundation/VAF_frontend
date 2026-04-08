import Navbar from "@/components/Ploggers/Navbar";
import HeroSection from "@/components/Ploggers/HeroSection";
import WhatIsPlogging from "@/components/Ploggers/WhatIsPlogging";
import WhyItMatters from "@/components/Ploggers/WhyItMatters";
import WhatWeDo from "@/components/Ploggers/WhatWeDo";
import CommunityGallery from "@/components/Ploggers/CommunityGallery";
import ImpactSection from "@/components/Ploggers/ImpactSection";
import FoundationSection from "@/components/Ploggers/FoundationSection";
import CTASection from "@/components/Ploggers/CTASection";
import Footer from "@/components/Ploggers/Footer";
import "./Ploggers.css";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <HeroSection />
        <WhatIsPlogging />
        <WhyItMatters />
        <WhatWeDo />
        <CommunityGallery />
        <ImpactSection />
        <FoundationSection />

        {/* CTA SECTION */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;