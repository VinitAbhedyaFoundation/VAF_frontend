const values = [
  {
    title: "Safe Spaces",
    description:
      "Every gathering is a sanctuary where all are welcome. We cultivate environments free from judgment, where vulnerability is met with compassion.",
  },
  {
    title: "Respectful Listening",
    description:
      "We practice the art of truly hearing one another. Every perspective is valued, every story honored with full attention.",
  },
  {
    title: "Welcoming Participation",
    description:
      "There is no prerequisite to join. Whether you're a voracious reader or just curious, your presence enriches our circle.",
  },
  {
    title: "Collective Growth",
    description:
      "We believe we rise together. Each insight shared, each story told, becomes a seed for community-wide transformation.",
  },
];

const ValuesSection = () => {
  return (
    <section id="values" className="scroll-mt-24 py-10 md:py-16 bg-[#F6E2CC]">
      <div className="ss-container px-4">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-20">
          <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-[#92400E] mb-3 md:mb-5">
            Our Atmosphere
          </p>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-semibold mb-4 md:mb-6 leading-tight text-[#0F172A]">
            A space that feels like{" "}
            <span className="italic font-light text-[#C2410C]">home</span>
          </h2>

          <p className="text-sm md:text-lg text-[#1F2937] leading-relaxed max-w-2xl mx-auto">
            These aren't just values we write about. They're the living,
            breathing essence of every gathering we hold.
          </p>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-16 gap-x-8 md:gap-x-20 max-w-5xl mx-auto">

          {values.map((value, index) => (
            <div
              key={index}
              className="pl-5 md:pl-8 border-l-2 border-[#C2410C]/40"
            >
              <h3 className="text-lg md:text-2xl font-display font-semibold text-[#111827] mb-3 md:mb-4">
                {value.title}
              </h3>

              <p className="text-[#374151] text-sm md:text-base leading-relaxed max-w-md">
                {value.description}
              </p>
            </div>
          ))}

        </div>

      </div>

      {/* Divider */}
      <div className="mt-12 md:mt-24 flex justify-center">
        <div className="w-20 md:w-28 h-[2px] bg-[#C2410C]/70" />
      </div>
    </section>
  );
};

export default ValuesSection;