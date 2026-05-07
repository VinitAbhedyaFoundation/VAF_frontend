import { useEffect, useRef } from "react";
import { TreePine, Users, Sparkles, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

// 👉 IMPORTANT: Replace this with your actual poster path
const poster = "/images/Posters/poster1.jpeg";

const reasons = [
  {
    number: "01",
    icon: TreePine,
    title: "Cleaner Public Spaces",
    description:
      "Clean streets, parks, and public areas through consistent plogging drives.",
  },
  {
    number: "02",
    icon: Users,
    title: "Healthy Lifestyle",
    description:
      "Stay active while contributing to the environment.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Community Awareness",
    description:
      "Build responsibility and awareness around waste management.",
  },
  {
    number: "04",
    icon: MapPin,
    title: "Local Impact",
    description:
      "Make visible change in Chhatrapati Sambhajinagar.",
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

    const items = sectionRef.current?.querySelectorAll(".animate-item");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-white via-emerald-50/30 to-white"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-16">

        {/* 🚨 HERO EVENT BLOCK (POSTER + URGENCY) */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT - TEXT */}
          <div className="animate-item opacity-0 translate-y-6 transition-all duration-700 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
              This Sunday, Don’t Just Show Up —{" "}
              <span className="text-emerald-600">
                Make an Impact
              </span>
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground mb-6">
              Be part of a real on-ground clean-up drive in
              <span className="text-emerald-600 font-medium">
                {" "}Chhatrapati Sambhajinagar
              </span>.
              Show up, take action, and make an actual difference.
            </p>

            {/* 🔥 STRONG CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScrmxN2cjHbjJs8vBSqrRIyhlioUrAsiq8ufqvg7B_3G3efUg/viewform"
                className="px-6 py-3 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition text-center"
              >
                Register Now
              </a>

              <a
                href="#details"
                className="px-6 py-3 rounded-full border border-emerald-500 text-emerald-600 font-semibold hover:bg-emerald-50 transition text-center"
              >
                View Details
              </a>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Small effort. Visible impact.
            </p>
          </div>

          {/* RIGHT - POSTER */}
          <div className="animate-item opacity-0 translate-y-6 transition-all duration-700 delay-200 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
            <img
              src={poster}
              alt="Plogging Drive Poster"
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>
        </div>

        {/* WHY IT MATTERS (SECONDARY NOW) */}
        <div id="details" className="flex flex-col gap-10">

          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Why It Matters
            </h2>
            <p className="text-muted-foreground">
              This isn’t just a walk — it’s direct action for a cleaner city.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reasons.map((reason, i) => (
              <div
                key={reason.title}
                className={cn(
                  "animate-item opacity-0 translate-y-6 transition-all duration-700",
                  "[&.animate-in]:opacity-100 [&.animate-in]:translate-y-0",
                  "rounded-xl border bg-card p-5 hover:shadow-md"
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="text-emerald-400 text-xl">
                  {reason.number}
                </span>

                <div className="w-8 h-8 bg-emerald-50 flex items-center justify-center my-3 rounded">
                  <reason.icon className="w-4 h-4 text-emerald-600" />
                </div>

                <h3 className="font-semibold mb-1">
                  {reason.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 🔥 FINAL CTA - CLEAN GREEN BLOCK */}
        <div className="rounded-2xl bg-emerald-600 text-white p-8 sm:p-12">

          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">

            {/* LEFT CONTENT */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                Be Part of the Plogging Drive
              </h2>

              <p className="text-emerald-100 max-w-md">
                Step out this Sunday and contribute to a cleaner
                Chhatrapati Sambhajinagar. Real impact starts with showing up.
              </p>
            </div>

            {/* RIGHT ACTION */}
            <div className="flex flex-col sm:flex-row gap-4">

              {/* PRIMARY BUTTON */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScrmxN2cjHbjJs8vBSqrRIyhlioUrAsiq8ufqvg7B_3G3efUg/viewform"
                className="px-8 py-3 rounded-full bg-white text-emerald-700 font-semibold hover:bg-emerald-50 transition"
              >
                Register Now
              </a>

              {/* SECONDARY BUTTON */}
              <a
                href="#details"
                className="px-8 py-3 rounded-full border border-white text-white font-semibold hover:bg-white/10 transition"
              >
                Learn More
              </a>
            </div>

          </div>

          {/* SUBTEXT */}
          <div className="mt-6 text-center text-sm text-emerald-200">
            Show up. Take action. Make it count.
          </div>
        </div>

      </div >
    </section >
  );
};

export default WhyItMatters;