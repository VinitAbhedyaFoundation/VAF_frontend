const WhyItMattersSection = () => {
  const cards = [
    {
      num: "01",
      tag: "Connection",
      title: "Empathy",
      desc: "Building emotional understanding through shared stories that transcend difference and nurture genuine human bonds.",
      stat: "200+",
      statLabel: "stories exchanged",
    },
    {
      num: "02",
      tag: "Conversation",
      title: "Dialogue",
      desc: "Encouraging thoughtful, inclusive conversations where every voice is heard and every perspective considered.",
      stat: "50+",
      statLabel: "sessions hosted",
    },
    {
      num: "03",
      tag: "People",
      title: "Community",
      desc: "Creating meaningful human connections that last well beyond any single gathering or shared moment.",
      stat: "1,000+",
      statLabel: "members connected",
    },
  ];

  return (
    <section className="relative py-20 md:py-7 bg-[#F6E2CC] overflow-hidden">

      {/* Header */}
      <div className="max-w-2xl mx-auto px-5 text-center mb-14 md:mb-20">
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="w-8 h-px bg-[#C2410C]/40" />
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#92400E] font-medium">
            Why It Matters
          </p>
          <span className="w-8 h-px bg-[#C2410C]/40" />
        </div>

        <h2 className="font-display text-4xl md:text-[54px] font-normal leading-[1.15] text-[#0F172A]">
          Building bridges through
          <br />
          <em className="italic font-light text-[#C2410C]">shared understanding</em>
        </h2>

        <p className="mt-6 text-[15px] font-light text-[#4B5563] leading-relaxed max-w-[520px] mx-auto">
          In a time when everything feels fast and divided, we create space
          for people to slow down, listen deeply, and connect beyond surface-level opinions.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto px-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
        {cards.map((item, i) => (
          <div
            key={i}
            className="group relative p-8 rounded-[20px] bg-white/45 border border-white/60 hover:border-[#C2410C]/35 hover:bg-white/60 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* hover glow */}
            <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-[#C2410C]/7 to-transparent" />

            {/* bg number */}
            <span className="absolute top-5 right-6 font-display text-[52px] font-normal leading-none text-[#C2410C]/9 group-hover:text-[#C2410C]/14 transition-colors duration-300 select-none pointer-events-none">
              {item.num}
            </span>

            <div className="relative z-10">
              {/* accent line */}
              <div className="w-7 group-hover:w-11 h-[2px] bg-[#C2410C] mb-4 transition-all duration-300" />

              {/* tag */}
              <span className="inline-block text-[10px] font-medium tracking-[0.12em] uppercase text-[#92400E] bg-[#C2410C]/10 rounded-full px-[10px] py-[3px] mb-3">
                {item.tag}
              </span>

              <h3 className="font-display text-[26px] font-normal text-[#111827] mb-[10px] leading-snug">
                {item.title}
              </h3>

              <p className="text-sm font-light text-[#4B5563] leading-relaxed">
                {item.desc}
              </p>

              {/* stat */}
              <div className="mt-5 pt-[18px] border-t border-[#C2410C]/20 flex items-baseline gap-[6px]">
                <span className="font-display text-[22px] font-normal text-[#C2410C]">
                  {item.stat}
                </span>
                <span className="text-xs text-[#92400E]">{item.statLabel}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="mt-7 md:mt-20 flex justify-center">
        <div className="w-20 h-px bg-[#C2410C]/35" />
      </div>
    </section>
  );
};

export default WhyItMattersSection;