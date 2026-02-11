import { motion } from "framer-motion";
import { Award, Calendar, Heart } from "lucide-react";

const VolunteerOfMonthSection = () => {
  return (
    <section className="pt-20 pb-24 bg-gradient-to-b from-emerald-50 via-white to-emerald-100">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-body font-semibold text-primary uppercase tracking-wider">
            Recognition
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-3">
            Volunteer of the Month
          </h2>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-card rounded-3xl shadow-elevated overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
            {/* Avatar */}
            <div className="relative">
              <img
                src="https://i.pravatar.cc/150?img=68"
                alt="Volunteer of the Month"
                className="w-36 h-36 rounded-full object-cover border-4 border-primary/30"
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <Award className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>

            {/* Content */}
            <div className="text-center md:text-left flex-1">
              <h3 className="text-2xl font-display font-bold text-foreground mb-1">
                Rajesh Wagh
              </h3>
              <p className="text-primary font-body font-medium mb-4">
                February 2026
              </p>

              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                Rajesh has been an outstanding volunteer, leading 12 plogging
                drives and mentoring new community members. His dedication to
                environmental cleanup and community building is truly
                inspirational.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 bg-background rounded-full px-4 py-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="font-body text-sm text-foreground">
                    12 Drives Led
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-background rounded-full px-4 py-2">
                  <Heart className="w-4 h-4 text-primary" />
                  <span className="font-body text-sm text-foreground">
                    200+ Hours
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VolunteerOfMonthSection;
