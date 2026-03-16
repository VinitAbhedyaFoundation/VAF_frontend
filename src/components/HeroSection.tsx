import { motion } from "framer-motion";
import { ArrowDown, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/VinitAbhedya/hero-bg.jpg"
          alt="Volunteers planting trees"
          className="w-full h-full object-cover object-[center_5%] scale-105"
        />

        {/* Clean SaaS-style overlay */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-20 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
        
          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
            Vinit Abhedya
            <span className="block text-emerald-400">
              Foundation
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed">
            Driving measurable impact through environmental action,
            women empowerment, and community-led transformation.
          </p>

          {/* SaaS-Style CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">

            {/* Primary CTA */}
            <a href="#initiatives">
              <Button
                size="lg"
                className="
                  relative
                  rounded-full
                  px-10
                  h-14
                  text-base
                  font-semibold
                  bg-emerald-500
                  hover:bg-emerald-600
                  text-white
                  transition-all duration-300
                  shadow-xl
                  hover:shadow-emerald-500/40
                  hover:-translate-y-1
                "
              >
                Explore Initiatives
              </Button>
            </a>

            {/* Secondary CTA */}
            <a href="#donate">
              <Button
                size="lg"
                variant="outline"
                className="
                  rounded-full
                  px-10
                  h-14
                  text-base
                  font-semibold
                  border-white/30
                  text-white
                  bg-white/5
                  backdrop-blur-md
                  hover:bg-white/15
                  hover:-translate-y-1
                  transition-all duration-300
                  gap-2
                "
              >
                <Heart className="w-4 h-4" />
                Support Us
              </Button>
            </a>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-16 flex justify-center"
          >
            <a href="#impact" aria-label="Scroll to About section">
              <ArrowDown className="w-6 h-6 text-primary-foreground/70 animate-bounce" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;