import { Footprints, Trash2, Heart } from "lucide-react";

const WhatIsPlogging = () => {
  const steps = [
    {
      icon: Footprints,
      title: "Walk or Jog",
      description:
        "Start with a simple walk or jog through your neighborhood, park, or any public space.",
    },
    {
      icon: Trash2,
      title: "Collect Litter",
      description:
        "Pick up trash and litter along the way. Every piece counts toward a cleaner community.",
    },
    {
      icon: Heart,
      title: "Care Together",
      description:
        "Join others who care about our shared spaces. Together, we make a visible difference.",
    },
  ];

  return (
    <section
      id="what-is-plogging"
      className="relative scroll-mt-24 py-16 sm:py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white overflow-hidden"
    >
      {/* soft eco glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-emerald-200/30 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container-wide relative z-10 px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-green-900 mb-4 leading-tight">
            What is Plogging?
          </h2>

          <div className="w-14 sm:w-16 h-[2px] bg-emerald-500 mx-auto mb-5 rounded-full"></div>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Born in Sweden, plogging turns everyday exercise into environmental
            action. Simple, inclusive, and impactful.
          </p>
        </div>

        {/* Steps */}
        <div className="relative flex flex-col md:grid md:grid-cols-3 gap-6 sm:gap-8">

          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-12 left-[17%] right-[17%] h-[2px] bg-emerald-200"></div>

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Step number */}
              <span className="absolute top-4 right-4 text-4xl sm:text-5xl font-serif text-emerald-100 select-none">
                {index + 1}
              </span>

              {/* Icon */}
              <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-5 sm:mb-6 transition group-hover:bg-emerald-600 group-hover:text-white">
                <step.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2 sm:mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {step.description}
              </p>

              {/* Mobile vertical connector */}
              {index !== steps.length - 1 && (
                <div className="md:hidden absolute left-1/2 -bottom-6 -translate-x-1/2 w-[2px] h-6 bg-emerald-200"></div>
              )}

              {/* Hover line */}
              <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-emerald-500 transition-all duration-300 group-hover:w-full rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIsPlogging;