import { motion } from "framer-motion";
import { Heart, Gift, Sparkles, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const reasons = [
  {
    icon: Gift,
    title: "Small Help, Big Impact",
    desc: "Even ₹100 can support tree plantation drives or provide books for community learning.",
  },
  {
    icon: Sparkles,
    title: "100% Transparent",
    desc: "Every contribution is documented. You see exactly how your support creates measurable change.",
  },
  {
    icon: HandHeart,
    title: "Empower Communities",
    desc: "Funding goes directly to volunteer programs, awareness campaigns, and on-ground action.",
  },
];

const DonationSection = () => {

  const navigate = useNavigate(); // navigation hook

  const handleDonate = () => {
    navigate("/donate"); // redirect to donation page
  };

  return (
    <section
      id="donate"
      className="relative py-24 bg-gradient-to-b from-emerald-50 via-green-50 to-emerald-100 text-slate-900 overflow-hidden"
    >
      {/* 🌿 organic nature lighting blobs — matching CTASection exactly */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-300/30 blur-[140px] rounded-full" />
      <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] bg-green-400/20 blur-[140px] rounded-full" />

      <div className="relative z-10 container mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-emerald-100 border border-emerald-200">
            <Heart className="w-7 h-7 text-emerald-700" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-green-900">
            Every Contribution Counts
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed">
            Your generosity strengthens communities, restores environments,
            and empowers individuals to create lasting impact.
          </p>
        </motion.div>

        {/* Reason Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="
                group
                rounded-3xl
                p-10
                text-center
                bg-white
                shadow-lg
                border border-emerald-100
                transition-all duration-300
                hover:-translate-y-2 hover:shadow-xl
              "
            >
              <div className="
                inline-flex items-center justify-center
                w-16 h-16 rounded-2xl mb-6
                bg-emerald-100 text-emerald-700
                transition-transform duration-300
                group-hover:scale-110
              ">
                <r.icon className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-semibold mb-3 text-slate-900">
                {r.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={handleDonate}
            className="
              group
              rounded-full
              px-12
              py-6
              text-lg
              font-semibold
              bg-emerald-600
              text-white
              hover:bg-emerald-700
              transition-all duration-300
              hover:scale-105
              shadow-xl
              hover:shadow-2xl
              gap-2
            "
          >
            <Heart className="w-5 h-5" />
            Donate Now
          </Button>

          <p className="text-sm text-slate-600 mt-6">
            Secure payment • Tax deductible • Every rupee matters
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default DonationSection;