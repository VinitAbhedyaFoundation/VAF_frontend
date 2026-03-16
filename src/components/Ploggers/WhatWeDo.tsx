import { useEffect, useRef, useState } from "react";
import { Calendar, Users, Megaphone, Route } from "lucide-react";

const WhatWeDo = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const activities = [
    {
      icon: Calendar,
      title: "Weekly Plogging Drives",
      description:
        "Regular community drives every weekend where we walk, jog, and clean together.",
    },
    {
      icon: Users,
      title: "Community Cleanups",
      description:
        "Organized cleanup events in parks, streets, and public spaces across the city.",
    },
    {
      icon: Route,
      title: "Awareness Walks",
      description:
        "Educational walks that spread the message of environmental responsibility.",
    },
    {
      icon: Megaphone,
      title: "Volunteer Coordination",
      description:
        "Connecting passionate individuals with meaningful opportunities to contribute.",
    },
  ];

  return (
    <section
      id="what-we-do"
      ref={sectionRef}
      className="relative scroll-mt-24 py-28 bg-gradient-to-b from-white via-emerald-50/40 to-white overflow-hidden"
    >
      {/* Soft nature glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-200/30 blur-[140px] rounded-full"></div>

      <div className="container-wide relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-900 tracking-tight mb-5">
            What We Do
          </h2>

          <div className="w-16 h-[2px] bg-emerald-500 mx-auto mb-6 rounded-full"></div>

          <p className="text-lg text-slate-600 leading-relaxed">
            Our activities are designed to be accessible, consistent, and
            community-driven. Everyone is welcome — regardless of fitness
            level or experience.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((activity, index) => (
            <div
              key={activity.title}
              style={{
                transitionDelay: `${index * 120}ms`,
              }}
              className={`group relative p-7 rounded-2xl bg-white border border-emerald-100 shadow-sm transition-all duration-700 
              
              ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }

              hover:-translate-y-2 hover:shadow-xl`}
            >
              {/* Icon */}
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-100 text-emerald-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-200">
                <activity.icon className="w-7 h-7" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                {activity.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {activity.description}
              </p>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-emerald-500 transition-all duration-500 group-hover:w-full rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;