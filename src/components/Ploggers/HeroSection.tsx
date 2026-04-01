import { Button } from "@/components/ui/button";

const heroImage = "/images/Ploggers/ChatGPT Image Mar 17, 2026, 11_57_43 PM.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Plogging clean-up drive in Chhatrapati Sambhajinagar by volunteers"
          className="w-full h-full object-cover object-[center] scale-100"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide px-6 pt-40 pb-28 text-center">
        <div className="max-w-3xl mx-auto">

          {/* Tagline */}
          <p className="text-xs tracking-[0.45em] uppercase text-white/70 mb-6 font-medium">
            Plogging Initiative in Chhatrapati Sambhajinagar
          </p>

          {/* SEO H1 */}
          <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            Plogging Clean-Up Drives{" "}
            <span className="text-emerald-400">
              in Sambhajinagar
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join our community-driven plogging initiative by Vinit Abhedya Foundation, 
            an NGO in Chhatrapati Sambhajinagar (Aurangabad), combining jogging with 
            cleaning streets to promote environmental awareness and local impact.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Button
              size="lg"
              className="
                rounded-full px-8 h-14 text-base font-semibold
                bg-emerald-500 hover:bg-emerald-600 text-white
                transition-all duration-300 shadow-xl
                hover:-translate-y-1 hover:shadow-emerald-500/40
              "
              asChild
            >
              <a href="#join">Join a Clean-Up Drive</a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="
                rounded-full px-8 h-14 text-base font-semibold
                border-white/40 text-white bg-white/5
                backdrop-blur-md hover:bg-white/15
                hover:-translate-y-1 transition-all duration-300
              "
              asChild
            >
              <a href="#what-is-plogging">What is Plogging?</a>
            </Button>
          </div>

        </div>
      </div>

      {/* Next Drive Badge */}
      <div className="hidden lg:flex absolute bottom-8 right-8 items-center gap-3 bg-white/[.07] backdrop-blur-xl border border-white/[.12] rounded-2xl px-4 py-3.5 z-10">
        <div className="w-9 h-9 rounded-[10px] bg-emerald-500 flex items-center justify-center shrink-0">
          <svg
            className="w-[18px] h-[18px] stroke-white"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.8"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        </div>
        <div>
          <p className="text-[.85rem] font-semibold text-white leading-tight">
            Clean-Up Drives Conducted
          </p>
          <p className="text-[.75rem] text-white/55 leading-tight">
            Every Sunday in Sambhajinagar
          </p>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;