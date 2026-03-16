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
  const sectionRef = useRef<HTMLDivElement>(null);

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
      className="relative scroll-mt-24 py-24 sm:py-32 px-4 bg-gradient-to-b from-white via-emerald-50/30 to-white overflow-hidden"
    >

      {/* 🌿 subtle organic glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-200/30 blur-[140px] rounded-full pointer-events-none"></div>

      {/* floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="leaf left-[12%] top-[20%]" />
        <span className="leaf left-[85%] top-[30%]" />
        <span className="leaf left-[40%] top-[75%]" />
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* Left — editorial text */}
        <div
          className="left-col opacity-0 translate-y-6 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Why It Matters
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl leading-[1.15] text-foreground mb-6 tracking-tight">
            Small actions.{" "}
            <em className="not-italic text-emerald-600">Lasting change.</em>
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-5">
            Plogging isn't about perfection — it's about participation. When
            people come together to care for their surroundings, something
            powerful happens: communities become more connected, spaces become
            more valued, and change becomes visible.
          </p>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            In Chh. Sambhajinagar, we believe that small actions, done
            consistently and collectively, create the kind of change that lasts.
          </p>

          <div className="mt-10 w-12 h-0.5 bg-emerald-500 rounded-full" />
        </div>

        {/* Right — reason cards */}
        <div className="grid sm:grid-cols-2 gap-5">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className={cn(
                "reason-card group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-6",
                "opacity-0 translate-y-6 transition-all duration-700 ease-out",
                "[&.animate-in]:opacity-100 [&.animate-in]:translate-y-0",
                "hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_14px_38px_rgba(5,150,105,0.08)]"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >

              {/* glow hover */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(167,243,208,0.18),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* number */}
              <span className="font-serif text-4xl text-emerald-100 dark:text-emerald-900/40 leading-none select-none mb-3 block">
                {reason.number}
              </span>

              {/* icon */}
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                <reason.icon className="w-[18px] h-[18px] text-emerald-600" />
              </div>

              <h3 className="text-sm font-semibold text-foreground mb-2 tracking-tight">
                {reason.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* leaf animation */}
      <style>{`
        .leaf{
          position:absolute;
          width:10px;
          height:10px;
          background:rgba(16,185,129,0.25);
          border-radius:3px 10px 3px 10px;
          transform:rotate(45deg);
          animation:leafFloat 12s infinite ease-in-out;
        }

        @keyframes leafFloat{
          0%{transform:translateY(0) rotate(45deg);opacity:.4;}
          50%{transform:translateY(-20px) rotate(60deg);opacity:.2;}
          100%{transform:translateY(0) rotate(45deg);opacity:.4;}
        }
      `}</style>

    </section>
  );
};

export default WhyItMatters;