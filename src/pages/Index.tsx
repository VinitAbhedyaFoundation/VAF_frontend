import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import AboutSection from "@/components/AboutSection";
import InitiativesSection from "@/components/InitiativesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
//import TeamSection from "@/components/TeamSection"; 
import VolunteerOfMonthSection from "@/components/VolunteerOfMonthSection";
import DonationSection from "@/components/DonationSection";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ImpactSection />
      <AboutSection />
      <InitiativesSection />
      <TestimonialsSection />
      { /* <TeamSection /> */}
      <VolunteerOfMonthSection />
      <DonationSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
