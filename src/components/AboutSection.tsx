import { motion } from "framer-motion";
import aboutImg from "@/assets/20210905100549_IMG_5103-1-1-scaled.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="pt-12 pb-20 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-body font-semibold text-primary uppercase tracking-wider">
            About Us
          </span>
        </motion.div>

        {/* Content + Image */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <p className="font-body text-lg text-foreground leading-relaxed">
              Vinit Abhedya Foundation is a community-driven initiative working
              at the grassroots level to create positive environmental and
              social impact in Chh. Sambhajinagar.
            </p>

            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Our work spans environmental conservation, public cleanliness,
              women’s empowerment, and access to education through on-ground
              drives, awareness programs, and volunteer-led initiatives.
            </p>

            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              By collaborating with volunteers, local communities, and partner
              organizations, we focus on sustainable action, transparency, and
              long-term change rather than short-term outcomes.
            </p>
          </motion.div>

          {/* RIGHT: Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-elevated"
          >
            <img
              src={aboutImg}
              alt="Community initiatives by Vinit Abhedya Foundation"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
