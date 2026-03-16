function CTASection() {
  return (
    <section
      id="join"
      className="scroll-mt-24 pt-7 pb-7 bg-[#0F2A28] text-white"
    >
      <div className="ss-container">
        <div className="max-w-3xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-display font-semibold mb-6 leading-tight text-[#FFF8EE]">
            Ready to join the conversation?
          </h2>

          <p className="text-base md:text-lg mb-10 max-w-xl mx-auto text-[#D1D5DB] leading-relaxed">
            There’s always room on the Shelf. Whether you want to read,
            listen, share, or simply be present — you’re welcome here.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">

            {/* Primary Button */}
            <a
              href="#"
              className="px-10 py-4 rounded-full
                         bg-[#C2410C] text-white
                         text-sm tracking-wide font-semibold
                         transition-all duration-300
                         hover:bg-[#9A3412]
                         hover:scale-[1.05]"
            >
              Join a Reading Circle
            </a>

            {/* Secondary Button */}
            <a
              href="#"
              className="px-10 py-4 rounded-full
                         border border-white/40
                         text-white
                         text-sm tracking-wide font-semibold
                         transition-all duration-300
                         hover:bg-white hover:text-[#0F2A28]"
            >
              Volunteer With Us
            </a>

          </div>

          <p className="mt-8 text-xs text-white/60 tracking-wide">
            No pressure. Take your time. The Shelf is patient.
          </p>

        </div>
      </div>
    </section>
  );
}

export default CTASection;