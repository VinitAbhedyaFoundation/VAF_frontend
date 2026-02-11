import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail } from "lucide-react";

const team = [
  {
    name: "Vinit Abhedya",
    role: "Founder & President",
    initials: "VA",
    bio: "Visionary leader driving community transformation through grassroots activism.",
  },
  {
    name: "Sneha Kulkarni",
    role: "Head of Operations",
    initials: "SK",
    bio: "Ensures seamless coordination across all initiatives and volunteer programs.",
  },
  {
    name: "Amit Rathore",
    role: "Ploggers Lead",
    initials: "AR",
    bio: "Passionate environmentalist leading the Sambhajinagar Ploggers movement.",
  },
  {
    name: "Meera Joshi",
    role: "Laal Bindi Coordinator",
    initials: "MJ",
    bio: "Championing women's rights and empowerment through the Laal Bindi campaign.",
  },
];

const TeamSection = () => {
  return (
    <section
      id="team"
      className="py-24 bg-gradient-to-b from-emerald-50 via-white to-emerald-100"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-body font-semibold text-primary uppercase tracking-wider">
            Our Team
          </span>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-white rounded-2xl p-6 text-center shadow-card hover:shadow-elevated transition-all hover:-translate-y-1"
            >
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground font-display font-bold text-xl group-hover:scale-110 transition-transform">
                {member.initials}
              </div>

              <h3 className="font-display text-lg font-semibold text-foreground">
                {member.name}
              </h3>

              <p className="font-body text-sm text-primary font-medium mb-2">
                {member.role}
              </p>

              <p className="font-body text-sm text-muted-foreground mb-4">
                {member.bio}
              </p>

              <div className="flex items-center justify-center gap-3">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
