import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TreePine, Users, Clock, MapPin } from "lucide-react";

const stats = [
  { icon: TreePine, label: "Cleanup Drives", value: 120, suffix: "+" },
  { icon: Users, label: "Volunteers", value: 3500, suffix: "+" },
  { icon: Clock, label: "Hours of Service", value: 12000, suffix: "+" },
  { icon: MapPin, label: "Areas Covered", value: 45, suffix: "+" },
];

function useCountUp(target: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, inView]);
  return count;
}

const StatCard = ({ stat, inView }: { stat: (typeof stats)[0]; inView: boolean }) => {
  const count = useCountUp(stat.value, inView);
  return (
    <div className="text-center">
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <stat.icon className="w-7 h-7 text-primary" />
      </div>
      <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1">
        {count.toLocaleString()}
        {stat.suffix}
      </div>
      <div className="font-body text-muted-foreground text-sm">{stat.label}</div>
    </div>
  );
};

const ImpactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="impact" className="pt-16 pb-6 bg-card" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="text-sm font-body font-semibold text-primary uppercase tracking-wider">Our Impact</span>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <StatCard stat={stat} inView={inView} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
