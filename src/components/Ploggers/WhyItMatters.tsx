import { useEffect, useRef } from "react";
import { TreePine, Users, Sparkles, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const reasons = [
  {
    number: "01",
    icon: TreePine,
    title: "Cleaner Public Spaces",
    description:
      "Plogging drives help clean streets, parks, and public areas in Sambhajinagar.",
  },
  {
    number: "02",
    icon: Users,
    title: "Healthy Lifestyle",
    description:
      "Combine walking or jogging with cleaning for fitness and environmental action.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Community Awareness",
    description:
      "Clean-up drives build awareness about waste management and responsibility.",
  },
  {
    number: "04",
    icon: MapPin,
    title: "Local Impact",
    description:
      "Volunteer-led initiatives create visible impact across Sambhajinagar.",
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
      className="relative scroll-mt-24 py-16 sm:py-24 px-4 bg-gradient-to-b from-white via-emerald-50/30 to-white"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-16">

        {/* ===== WHY IT MATTERS ===== */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-start">

          {/* LEFT */}
          <div className="left-col opacity-0 translate-y-6 transition-all duration-700 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">

            <div className="text-xs font-medium uppercase text-emerald-600 mb-4">
              Why It Matters
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              Plogging in{" "}
              <span className="text-emerald-600">
                Chhatrapati Sambhajinagar
              </span>
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground mb-3">
              Plogging clean-up drives in Sambhajinagar improve public cleanliness
              and promote environmental awareness through simple community action.
            </p>

            <p className="text-base sm:text-lg text-muted-foreground">
              These volunteer-led initiatives create visible impact and encourage
              responsible habits across local neighborhoods.
            </p>
          </div>

          {/* RIGHT */}
          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => (
              <div
                key={reason.title}
                className={cn(
                  "reason-card group relative rounded-xl border bg-card p-5 overflow-hidden",
                  "opacity-0 translate-y-6 transition-all duration-700",
                  "[&.animate-in]:opacity-100 [&.animate-in]:translate-y-0",
                  "hover:-translate-y-1 hover:border-emerald-200",
                  "hover:shadow-[0_10px_25px_rgba(16,185,129,0.12)]"
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <span className="text-2xl text-emerald-300 block mb-2">
                  {reason.number}
                </span>

                <div className="w-8 h-8 bg-emerald-50 flex items-center justify-center mb-3 rounded transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-100">
                  <reason.icon className="w-4 h-4 text-emerald-600" />
                </div>

                <h3 className="text-sm font-semibold mb-1">
                  {reason.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== JOIN NEXT DRIVE ===== */}
        <div
          id="join"
          className="rounded-2xl border bg-emerald-50 p-8 sm:p-10 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Register For Next Plogging Drive
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground mb-6">
            Be part of a clean-up drive in{" "}
            <span className="text-emerald-600 font-medium">
              Chhatrapati Sambhajinagar
            </span>{" "}
            and help create a cleaner, healthier environment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScrmxN2cjHbjJs8vBSqrRIyhlioUrAsiq8ufqvg7B_3G3efUg/viewform"
              className="px-6 py-3 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
            >
              Register For Next Drive
            </a>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            Drives are conducted every Sunday in Sambhajinagar.
          </p>
        </div>

      </div>
    </section>
  );
};

export default WhyItMatters;