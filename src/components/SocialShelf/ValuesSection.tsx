const values = [
  {
    num: "01",
    title: "Safe Spaces",
    description:
      "Every gathering is a sanctuary where all are welcome. We cultivate environments free from judgment, where vulnerability is met with compassion.",
  },
  {
    num: "02",
    title: "Respectful Listening",
    description:
      "We practice the art of truly hearing one another. Every perspective is valued, every story honored with full attention.",
  },
  {
    num: "03",
    title: "Welcoming Participation",
    description:
      "There is no prerequisite to join. Whether you're a voracious reader or just curious, your presence enriches our circle.",
  },
  {
    num: "04",
    title: "Collective Growth",
    description:
      "We believe we rise together. Each insight shared, each story told, becomes a seed for community-wide transformation.",
  },
];

const ValuesSection = () => {
  return (
    <section
      id="values"
      className="scroll-mt-24 relative py-16 md:py-7 bg-[#F6E2CC] overflow-hidden"
    >
      {/* Soft glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-[#C2410C]/7 rounded-full blur-3xl pointer-events-none" />

      <div className="ss-container relative z-10 px-4">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-7 h-px bg-[#C2410C]/40" />
            <p className="text-[10px] font-medium tracking-[0.35em] uppercase text-[#92400E]">
              Our Atmosphere
            </p>
            <span className="w-7 h-px bg-[#C2410C]/40" />
          </div>

          <h2 className="font-display text-3xl md:text-[48px] font-normal leading-[1.18] text-[#0F172A] mb-4">
            A space that feels like{" "}
            <em className="italic font-light text-[#C2410C]">home</em>
          </h2>

          <p className="text-sm font-light text-[#4B5563] leading-relaxed max-w-[460px] mx-auto">
            These aren't just values we write about. They're the living,
            breathing essence of every gathering we hold.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {values.map((value, i) => (
            <div
              key={i}
              className="group relative p-7 md:p-8 bg-white/50 rounded-[20px]
                         border border-white/65
                         hover:border-[#C2410C]/30 hover:bg-white/65
                         hover:-translate-y-1 hover:shadow-[0_16px_48px_-12px_rgba(194,65,12,0.12)]
                         transition-all duration-300 overflow-hidden"
            >
              {/* Ghost number */}
              <span className="absolute top-5 right-6 font-display text-[48px] font-normal leading-none
                               text-[#C2410C]/8 group-hover:text-[#C2410C]/13
                               transition-colors duration-300 select-none pointer-events-none">
                {value.num}
              </span>

              {/* Accent line — expands on hover */}
              <div
                className="w-7 group-hover:w-11 h-[2px] bg-[#C2410C] mb-5 transition-all duration-300"
              />

              {/* Title */}
              <h3 className="relative z-10 font-display text-[22px] font-normal text-[#111827]
                             group-hover:text-[#C2410C] transition-colors duration-300 mb-3 leading-snug">
                {value.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-[13.5px] font-light text-[#4B5563] leading-relaxed">
                {value.description}
              </p>

              {/* Bottom sweep line */}
              <span
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C2410C] group-hover:w-full rounded-b-[20px]"
                style={{ transition: "width 350ms ease" }}
              />
            </div>
          ))}
        </div>

      </div>

      {/* Divider */}
      <div className="mt-14 md:mt-20 flex justify-center">
        <div className="w-20 h-px bg-[#C2410C]/40" />
      </div>
    </section>
  );
};

export default ValuesSection;