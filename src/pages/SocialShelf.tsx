import SEO from "@/components/SEO";
import Header from "@/components/SocialShelf/Header";
import HeroSection from "@/components/SocialShelf/HeroSection";
import AboutSection from "@/components/SocialShelf/AboutSection";
import ActivitiesSection from "@/components/SocialShelf/ActivitiesSection";
import WhyItMattersSection from "@/components/SocialShelf/WhyItMattersSection";
import ValuesSection from "@/components/SocialShelf/ValuesSection";
import FoundationSection from "@/components/SocialShelf/FoundationSection";
import CTASection from "@/components/SocialShelf/CTASection";
import Footer from "@/components/SocialShelf/Footer";
import EventGallery from "@/components/SocialShelf/EventGallery";
import "./SocialShelf.css";

const Index = () => {
  return (
    <>
      <SEO
        title="Social Shelf | Vinit Abhedya Foundation"
        description="Explore the social initiatives, stories and community work of Vinit Abhedya Foundation."
        path="/social-shelf"
      />
      <div className="social-shelf">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <ActivitiesSection />
          <EventGallery />
          <WhyItMattersSection />
          <ValuesSection />
          <FoundationSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
