const volunteerForm = "https://forms.gle/AjoNYEgmrRgtrE5c9";

function Footer() {
  return (
    <footer className="bg-[#0B1F1E] text-white py-12 md:py-16">
      <div className="ss-container px-4">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10">

          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-display text-xl md:text-2xl font-semibold text-[#FFF8EE]">
              Social Shelf
            </p>
            <p className="text-xs md:text-sm text-white/60 mt-2">
              A Vinit Abhedya Foundation Initiative
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm tracking-wide font-medium">
            <a
              href="#about"
              className="text-white/70 hover:text-[#C2410C] transition-colors duration-300"
            >
              About
            </a>

            <a
              href="#activities"
              className="text-white/70 hover:text-[#C2410C] transition-colors duration-300"
            >
              Activities
            </a>

            <a
              href="#values"
              className="text-white/70 hover:text-[#C2410C] transition-colors duration-300"
            >
              Values
            </a>

            <a
              href={volunteerForm}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-[#C2410C] transition-colors duration-300"
            >
              Join
            </a>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-10 md:mt-12 h-px bg-white/10" />

        {/* Bottom Section */}
        <div className="mt-6 md:mt-8 text-center text-[11px] md:text-xs text-white/50 tracking-wide">
          © {new Date().getFullYear()} Social Shelf. Crafted with intention.
        </div>

      </div>
    </footer>
  );
}

export default Footer;