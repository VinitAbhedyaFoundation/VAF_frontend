import { motion } from "framer-motion";
import { Heart, Gift, Sparkles, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";

const reasons = [
  {
    icon: Gift,
    title: "Small Help, Big Impact",
    desc: "Even ₹100 can provide saplings for a tree plantation drive or books for a community shelf.",
  },
  {
    icon: Sparkles,
    title: "100% Transparent",
    desc: "Every donation is tracked and reported. You'll see exactly how your contribution creates change.",
  },
  {
    icon: HandHeart,
    title: "Empower Communities",
    desc: "Your support funds volunteer programs, awareness campaigns, and on-ground initiatives.",
  },
];

const textOutline =
  "0 1px 2px rgba(0,0,0,0.45), 0 0 1px rgba(0,0,0,0.6)";

const DonationSection = () => {
  return (
    <section id="donate" className=" pb-20 pt-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-primary opacity-95" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Heart className="w-12 h-12 text-primary-foreground/90 mx-auto mb-4" />

          <h2
            className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-4"
            style={{ textShadow: textOutline }}
          >
            Every Contribution Counts
          </h2>

          <p
            className="font-body text-primary-foreground/85 text-lg max-w-2xl mx-auto"
            style={{ textShadow: textOutline }}
          >
            Your generosity fuels our mission. Help us plant more trees, empower
            more women, and spread knowledge further.
          </p>
        </motion.div>

        {/* Reasons */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/25"
            >
              <r.icon className="w-8 h-8 text-primary-foreground mb-3" />

              <h3
                className="font-display text-lg font-semibold text-primary-foreground mb-2"
                style={{ textShadow: textOutline }}
              >
                {r.title}
              </h3>

              <p
                className="font-body text-sm text-primary-foreground/75"
                style={{ textShadow: textOutline }}
              >
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-10 text-lg font-body font-semibold gap-2 shadow-lg"
          >
            <Heart className="w-5 h-5" /> Donate Now
          </Button>

          <p
            className="font-body text-primary-foreground/65 text-sm mt-4"
            style={{ textShadow: textOutline }}
          >
            Secure payment • Tax deductible • Every rupee matters
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DonationSection;
