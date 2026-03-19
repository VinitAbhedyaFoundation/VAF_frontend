import { useEffect, useRef, useState } from "react";
import { Calendar, Users, Megaphone, Route } from "lucide-react";

const WhatWeDo = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activities = [
    {
      icon: Calendar,
      title: "Weekly Plogging Drives",
      description:
        "Regular weekend drives where we walk, jog, and clean together.",
    },
    {
      icon: Users,
      title: "Community Cleanups",
      description:
        "Organized cleanup events in parks, streets, and public spaces.",
    },
    {
      icon: Route,
      title: "Awareness Walks",
      description:
        "Walks that spread awareness about environmental responsibility.",
    },
    {
      icon: Megaphone,
      title: "Volunteer Coordination",
      description:
        "Connecting people with meaningful ways to contribute.",
    },
  ];

  return (
    <section
      id="what-we-do"
      ref={sectionRef}
      className="relative scroll-mt-24 py-16 sm:py-24 bg-gradient-to-b from-white via-emerald-50/40 to-white overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-emerald-200/30 blur-[120px] rounded-full"></div>

      <div className="container-wide relative z-10 px-4 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-green-900 tracking-tight mb-4">
            What We Do
          </h2>

          <div className="w-14 sm:w-16 h-[2px] bg-emerald-500 mx-auto mb-5 rounded-full"></div>

          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed">
            Activities designed to be simple, consistent, and community-driven.
            Anyone can join — no experience needed.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {activities.map((activity, index) => (
            <div
              key={activity.title}
              style={{ transitionDelay: `${index * 120}ms` }}
              className={`group relative rounded-xl sm:rounded-2xl bg-white border border-emerald-100 
              
              p-5 sm:p-7
              shadow-sm transition-all duration-700

              ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }

              hover:-translate-y-1 hover:shadow-lg`}
            >
              {/* Icon */}
              <div className="mb-4 sm:mb-6 inline-flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-emerald-100 text-emerald-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-200">
                <activity.icon className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-xl font-semibold text-slate-800 mb-2 sm:mb-3">
                {activity.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activity.description}
              </p>

              {/* Hover line */}
              <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-emerald-500 transition-all duration-500 group-hover:w-full rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;