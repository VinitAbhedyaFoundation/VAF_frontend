const FoundationSection = () => {
  return (
    <section className="py-8 md:py-10 bg-[#F6E2CC] border-t border-[#C2410C]/20">
      <div className="ss-container px-4 text-center">

        <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-[#92400E] mb-2 md:mb-3">
          An initiative by
        </p>

        <h3 className="font-display text-xl md:text-3xl font-semibold text-[#0F172A]">
          Vinit Abhedya Foundation
        </h3>

        <p className="mt-3 md:mt-4 text-sm md:text-base text-[#1F2937] max-w-lg mx-auto leading-relaxed">
          Dedicated to fostering human connection, emotional growth,
          and community empowerment through culture and conversation.
        </p>

      </div>

      {/* Divider */}
      <div className="mt-8 md:mt-10 flex justify-center">
        <div className="w-20 md:w-28 h-[2px] bg-[#C2410C]/70" />
      </div>
    </section>
  );
};

export default FoundationSection;