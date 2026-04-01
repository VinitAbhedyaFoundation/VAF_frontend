import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="scroll-mt-24 py-16 md:py-20 bg-white">
      <div className="container mx-auto px-5 md:px-6">

        {/* Section Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-12 md:mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            About Us
          </span>
        </motion.div>

        {/* Content + Image */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* LEFT: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5 max-w-xl"
          >
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              Vinit Abhedya Foundation is an NGO in Chhatrapati Sambhajinagar (Aurangabad) 
              working at the grassroots level to create environmental awareness and community impact through local initiatives.
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Our work focuses on environmental conservation, public cleanliness drives, and awareness campaigns 
              conducted through on-ground activities and volunteer-led initiatives across Sambhajinagar.
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              By collaborating with volunteers, local communities, and partner organizations, we aim to build 
              sustainable solutions and long-term impact through consistent and practical initiatives.
            </p>
          </motion.div>

          {/* RIGHT: Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src="/images/VinitAbhedya/about-us.jpeg"
              alt="Environmental awareness and community initiatives by NGO in Chhatrapati Sambhajinagar"
              className="w-full h-[260px] sm:h-[320px] md:h-[420px] object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;