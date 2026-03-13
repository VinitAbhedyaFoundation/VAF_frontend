const eventReadingCircle = "/images/VinitAbhedya/books.jpeg";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="scroll-mt-24 relative pt-7 pb-7 bg-[#F6E2CC]"
    >
      <div className="ss-container relative z-10 opacity-100">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text Content */}
          <div className="lg:pr-8 text-black">

            <p className="text-xs tracking-[0.35em] uppercase text-[#92400E] mb-6">
              ABOUT SOCIAL SHELF
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl 
                           font-display font-semibold 
                           leading-tight mb-8 
                           text-[#0F172A]">
              More than a book club —
              <br />
              <span className="italic font-light text-[#C2410C]">
                a space to be heard
              </span>
            </h2>

            <div className="space-y-6 text-[#111827] leading-relaxed text-base md:text-lg">
              <p>
                Social Shelf is a gentle invitation to slow down. In a world of
                endless scrolling and quick takes, we believe in the power of
                sitting with a story and truly listening.
              </p>

              <p>
                We are a conversation circle where every voice matters — a safe
                space for expression, where vulnerability is welcomed and
                differences are honored.
              </p>

              <p className="font-semibold text-[#92400E]">
                Here, reading is not consumption — it’s connection.
              </p>
            </div>

          </div>

          {/* Image */}
          <div className="flex justify-center">
            <div className="relative w-[85%] lg:w-[75%]">

              <div className="absolute -inset-6 
                              bg-[#C2410C]/20 
                              rounded-2xl blur-2xl -z-10" />

              <img
                src={eventReadingCircle}
                alt="Community members gathered in a reading circle"
                className="w-full rounded-2xl shadow-2xl object-cover"
              />
            </div>
          </div>

        </div>
      </div>

      <div className="mt-24 flex justify-center">
        <div className="w-32 h-[2px] bg-[#C2410C]" />
      </div>

    </section>
  );
};

export default AboutSection;