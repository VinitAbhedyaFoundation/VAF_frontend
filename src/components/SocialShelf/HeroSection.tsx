const heroImage = "/images/TSS/hero-bg.jpeg";
const googleFormLink = "https://forms.gle/AjoNYEgmrRgtrE5c9"; 

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Social Shelf community reading group"
          className="w-full h-full object-cover scale-105"
        />

        {/* Cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-b
                        from-black/65
                        via-black/45
                        to-black/25" />

        {/* Radial spotlight behind text */}
        <div className="absolute inset-0 
                        bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.25)_45%,transparent_75%)]" />

        {/* Warm bottom glow */}
        <div className="absolute bottom-0 w-full h-40
                        bg-gradient-to-t from-[#F6E2CC]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 ss-container text-center pt-28 px-6">
        <div className="max-w-4xl mx-auto">

          <p className="text-xs tracking-[0.45em] uppercase 
                        text-[#F6E2CC]/90 mb-6 font-medium">
            A Community Reading Initiative
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl
                         leading-[1.05] mb-8
                         text-white font-display font-medium
                         drop-shadow-[0_12px_35px_rgba(0,0,0,0.65)]">
            Where stories bring
            <br />
            <span className="italic font-light text-[#F97316]">
              people together
            </span>
          </h1>

          <div className="w-24 h-[2px] bg-[#F97316] mx-auto mb-8 opacity-95" />

          <p className="text-lg md:text-xl
                        text-white/90
                        max-w-2xl mx-auto mb-14
                        leading-relaxed drop-shadow-md">
            A book club and social learning space where we gather to read,
            reflect, and grow — together, with empathy and intention.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">

            {/* Primary Button → Google Form */}
            <a
              href={googleFormLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4
                         bg-[#F97316] text-white
                         text-sm tracking-wide font-semibold
                         rounded-full
                         shadow-xl shadow-black/40
                         transition-all duration-300
                         hover:bg-[#EA580C]
                         hover:scale-[1.05]"
            >
              Join a Reading Circle
            </a>

            {/* Secondary Button */}
            <a
              href="#about"
              className="inline-flex items-center justify-center px-10 py-4
                         border border-white/60
                         text-white
                         text-sm tracking-wide font-semibold
                         rounded-full
                         backdrop-blur-md
                         transition-all duration-300
                         hover:bg-white/10
                         hover:scale-[1.03]"
            >
              Learn More
            </a>

          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;