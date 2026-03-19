import { useEffect, useRef } from "react";
import { TreePine, Users, Sparkles, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const reasons = [
  {
    number: "01",
    icon: TreePine,
    title: "Cleaner Neighborhoods",
    description:
      "Every drive leaves streets, parks, and public spaces visibly cleaner and more welcoming.",
  },
  {
    number: "02",
    icon: Users,
    title: "Healthier Habits",
    description:
      "Combine physical activity with purpose — exercise that benefits both body and community.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Shared Responsibility",
    description:
      "Build civic pride and collective ownership of the spaces we share with our neighbors.",
  },
  {
    number: "04",
    icon: MapPin,
    title: "Local Pride",
    description:
      "Chh. Sambhajinagar is our home. Taking care of it is how we show we belong.",
  },
];

const WhyItMatters = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const cards = sectionRef.current?.querySelectorAll(".reason-card");
    const left = sectionRef.current?.querySelector(".left-col");

    if (left) observer.observe(left);
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-it-matters"
      ref={sectionRef}
      className="relative scroll-mt-24 py-16 sm:py-24 px-4 bg-gradient-to-b from-white via-emerald-50/30 to-white overflow-hidden"
    >
      {/* glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-emerald-200/30 blur-[120px] rounded-full pointer-events-none"></div>

      {/* particles */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="leaf left-[10%] top-[25%]" />
        <span className="leaf left-[80%] top-[35%]" />
        <span className="leaf left-[45%] top-[80%]" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-12 sm:gap-16 items-start relative z-10">

        {/* LEFT */}
        <div className="left-col opacity-0 translate-y-6 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
          
          {/* tag */}
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-medium tracking-widest uppercase text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Why It Matters
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl leading-tight text-foreground mb-5 tracking-tight">
            Small actions.{" "}
            <span className="text-emerald-600">Lasting change.</span>
          </h2>

          <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed mb-4">
            Plogging isn't about perfection — it's about participation. When
            people care for their surroundings, communities become stronger and
            change becomes visible.
          </p>

          <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed">
            Small, consistent actions create lasting impact — especially when
            done together.
          </p>

          <div className="mt-6 sm:mt-10 w-10 sm:w-12 h-0.5 bg-emerald-500 rounded-full" />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-5">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className={cn(
                "reason-card group relative overflow-hidden rounded-xl sm:rounded-2xl border border-border/40 bg-card p-5 sm:p-6",
                "opacity-0 translate-y-6 transition-all duration-700 ease-out",
                "[&.animate-in]:opacity-100 [&.animate-in]:translate-y-0",
                "hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_10px_28px_rgba(5,150,105,0.08)]"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* hover glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(167,243,208,0.18),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <span className="font-serif text-3xl sm:text-4xl text-emerald-100 dark:text-emerald-900/40 mb-2 block">
                {reason.number}
              </span>

              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-emerald-50 flex items-center justify-center mb-3 sm:mb-4">
                <reason.icon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-emerald-600" />
              </div>

              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1 sm:mb-2">
                {reason.title}
              </h3>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* animation */}
      <style>{`
        .leaf{
          position:absolute;
          width:8px;
          height:8px;
          background:rgba(16,185,129,0.25);
          border-radius:3px 10px 3px 10px;
          transform:rotate(45deg);
          animation:leafFloat 12s infinite ease-in-out;
        }

        @keyframes leafFloat{
          0%{transform:translateY(0) rotate(45deg);opacity:.4;}
          50%{transform:translateY(-15px) rotate(60deg);opacity:.2;}
          100%{transform:translateY(0) rotate(45deg);opacity:.4;}
        }
      `}</style>
    </section>
  );
};

export default WhyItMatters;