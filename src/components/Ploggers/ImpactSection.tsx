import { useEffect, useRef, useState } from "react";
import { TrendingUp } from "lucide-react";

const stats = [
  {
    value: 120,
    suffix: "+",
    label: "Drives Conducted",
    description: "Weekly and monthly cleanup activities",
  },
  {
    value: 45,
    suffix: "+",
    label: "Areas Covered",
    description: "Parks, streets, and neighborhoods",
  },
  {
    value: 3500,
    suffix: "+",
    label: "Volunteers",
    description: "Community members participated",
  },
  {
    value: 2000,
    suffix: "+",
    label: "Kg Waste Collected",
    description: "Litter removed from public spaces",
  },
];

const CountUpNumber = ({ end, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          let start = 0;
          const duration = 1200;
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
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [end]);

  return (
    <div
      ref={ref}
      className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-600 mb-2"
    >
      {count}
      {suffix}
    </div>
  );
};

const ImpactSection = () => {
  return (
    <section
      id="impact"
      className="relative scroll-mt-24 py-16 sm:py-24 bg-gradient-to-b from-white via-emerald-50 to-white overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute -top-32 -left-32 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-emerald-200/30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-150px] right-[-120px] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-green-200/20 blur-[120px] rounded-full"></div>

      <div className="container-wide px-4 sm:px-6 relative z-10">

        {/* Heading */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-emerald-700 mb-3">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Our Impact
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-green-900 mb-4 leading-tight">
            Real Numbers, Real Change
          </h2>

          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed">
            Measured through consistent, community-driven efforts.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="
                group
                text-center
                p-5 sm:p-8
                rounded-xl sm:rounded-3xl
                bg-white
                border border-emerald-100
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-lg
              "
            >
              <CountUpNumber end={stat.value} suffix={stat.suffix} />

              <div className="text-base sm:text-lg font-semibold text-slate-900 mb-1 sm:mb-2">
                {stat.label}
              </div>

              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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