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
      className="relative scroll-mt-24 py-24 sm:py-32 bg-gradient-to-b from-white via-emerald-50/30 to-white overflow-hidden"
    >
      {/* soft eco glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-200/30 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="container-wide relative z-10">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-green-900 mb-4">
            What is Plogging?
          </h2>

          <div className="w-16 h-[2px] bg-emerald-500 mx-auto mb-6 rounded-full"></div>

          <p className="text-lg text-slate-600 leading-relaxed">
            Born in Sweden, plogging is a global movement that turns everyday
            exercise into environmental action. It’s simple, inclusive, and
            impactful.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-8">

          {/* connecting line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[17%] right-[17%] h-[2px] bg-emerald-200"></div>

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative bg-white rounded-2xl p-8 border border-emerald-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* step number */}
              <span className="absolute top-6 right-6 text-5xl font-serif text-emerald-100 select-none">
                {index + 1}
              </span>

              {/* icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-6 transition group-hover:bg-emerald-600 group-hover:text-white">
                <step.icon className="w-6 h-6" />
              </div>

              {/* title */}
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                {step.title}
              </h3>

              {/* description */}
              <p className="text-slate-600 leading-relaxed text-sm">
                {step.description}
              </p>

              {/* hover accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-emerald-500 transition-all duration-300 group-hover:w-full rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIsPlogging;