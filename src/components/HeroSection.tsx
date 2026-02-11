import { motion } from "framer-motion";
import { ArrowDown, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/20230423080147_IMG_6901-scaled.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Volunteers planting trees"
          className="w-full h-full object-cover object-[center_30%] scale-105"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

        {/* Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.55)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground text-sm font-body font-medium mb-6 backdrop-blur-sm border border-primary-foreground/20">
            ✨ Empowering Communities, Inspiring Change
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6">
            Vinit Abhedya <span className="text-mint">Foundation</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 font-body max-w-2xl mx-auto mb-10">
            Empowering communities through environmental action, women's
            empowerment, and the joy of shared knowledge. Together, we create
            lasting change.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#initiatives">
              <Button
                size="lg"
                className="gradient-primary text-primary-foreground rounded-full px-8 h-12 text-base font-body"
              >
                Explore Our Initiatives
              </Button>
            </a>

            <a href="#donate">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 h-12 text-base font-body border-primary-foreground/40 text-primary-foreground bg-transparent hover:bg-primary-foreground/10"
              >
                <Heart className="w-4 h-4 mr-2" />
                Support Us
              </Button>
            </a>
          </div>

          {/* Scroll indicator BELOW buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-12 flex justify-center"
          >
            <a href="#about" aria-label="Scroll to About section">
              <ArrowDown className="w-6 h-6 text-primary-foreground/70 animate-bounce" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
