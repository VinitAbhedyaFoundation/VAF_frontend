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
    <div
      ref={ref}
      className="text-4xl md:text-5xl font-bold text-emerald-600 mb-3"
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
      className="relative scroll-mt-24 py-28 bg-gradient-to-b from-white via-emerald-50 to-white overflow-hidden"
    >
      {/* 🌿 Organic light blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-200/30 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] bg-green-200/20 blur-[140px] rounded-full"></div>

      <div className="container-wide relative z-10">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-emerald-700 mb-4">
            <TrendingUp className="w-5 h-5" />

            <span className="text-sm font-semibold uppercase tracking-wider">
              Our Impact
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-5">
            Real Numbers, Real Change
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed">
            We measure our success not in grand claims, but in honest,
            grounded progress made together.
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="
                group
                text-center
                p-8
                rounded-3xl
                bg-white
                border border-emerald-100
                shadow-md
                transition-all duration-300
                hover:-translate-y-2 hover:shadow-xl
              "
            >
              <CountUpNumber end={stat.value} suffix={stat.suffix} />

              <div className="text-lg font-semibold text-slate-900 mb-2">
                {stat.label}
              </div>

              <div className="text-sm text-slate-600 leading-relaxed">
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