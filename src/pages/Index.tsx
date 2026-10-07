import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import AboutSection from "@/components/AboutSection";
import InitiativesSection from "@/components/InitiativesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
//import TeamSection from "@/components/TeamSection"; 
import VolunteerOfMonthSection from "@/components/VolunteerOfMonthSection";
import MediaCoverageSection from "@/components/MediaCoverageSection";
import DonationSection from "@/components/DonationSection";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";

const Index = () => {
  return (
    <>
      <SEO
        title="Vinit Abhedya Foundation | Cleaner, Greener & Heartful Chh. Sambhajinagar"
        description="Vinit Abhedya Foundation works to make Chh. Sambhajinagar cleaner, greener and heartful through community-driven environmental and social initiatives."
        path="/"
      />
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
        <ImpactSection />
        <AboutSection />
        <InitiativesSection />
        <MediaCoverageSection />

        <TestimonialsSection />
        { /* <TeamSection /> */}
        <VolunteerOfMonthSection />
        <DonationSection />
        <FAQSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
