import { useEffect, useRef, useState } from "react";
import { TrendingUp } from "lucide-react";

const stats = [
  {
    value: 50,
    suffix: "+",
    label: "Drives Conducted",
    description: "Regular weekly and monthly cleanup activities",
  },
  {
    value: 25,
    suffix: "+",
    label: "Areas Covered",
    description: "Parks, streets, and neighborhoods cleaned",
  },
  {
    value: 500,
    suffix: "+",
    label: "Volunteers Involved",
    description: "Community members who have participated",
  },
  {
    value: 2000,
    suffix: "+",
    label: "Kg Waste Collected",
    description: "Litter removed from public spaces",
  },
];

const CountUpNumber = ({ end, suffix }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          let start = 0;
          const duration = 1500;
          const increment = end / (duration / 16);

          const counter = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(counter);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-bold text-primary mb-2">
      {count}
      {suffix}
    </div>
  );
};

const ImpactSection = () => {
  return (
    <section id="impact" className="scroll-mt-24 section-padding bg-secondary/30">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-primary mb-4">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Our Impact
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Real Numbers, Real Change
          </h2>
          <p className="text-lg text-muted-foreground">
            We measure our success not in grand claims, but in honest,
            grounded progress made together.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-card border border-border/50"
            >
              <CountUpNumber end={stat.value} suffix={stat.suffix} />

              <div className="text-lg font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;