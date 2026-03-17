import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";

const logoDark = "/images/Laalbindi/LaalBindiLogo.png";
const logoLight = "/images/Laalbindi/LaalBindiLogo.png";

export function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  const navLinks = [
    { label: "About", href: "about" },
    { label: "Why It Matters", href: "why" },
    { label: "What We Do", href: "what" },
    { label: "Get Involved", href: "involved" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#2B2826]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-2 md:py-3 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group cursor-pointer relative"
        >
          {/* ❌ removed white glow div */}

          <motion.img
            src={isScrolled ? logoDark : logoLight}
            alt="Laal Bindi Logo"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="relative w-20 md:w-24 h-auto object-contain"
          />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((link, index) => (
            <motion.button
              key={index}
              onClick={() => scrollToSection(link.href)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              className={`transition-colors duration-300 text-sm tracking-wider relative group ${
                isScrolled
                  ? "text-[#2B2826] hover:text-[#8B3A3A]"
                  : "text-white hover:text-[#E36A6A]"
              }`}
              style={
                !isScrolled
                  ? { textShadow: "0 2px 8px rgba(0,0,0,0.6)" }
                  : {}
              }
            >
              {link.label}

              <span
                className={`absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                  isScrolled ? "bg-[#8B3A3A]" : "bg-[#E36A6A]"
                }`}
              />
            </motion.button>
          ))}
        </div>

        <MobileMenu
          navLinks={navLinks}
          scrollToSection={scrollToSection}
          isScrolled={isScrolled}
        />
      </div>
    </motion.nav>
  );
}

function MobileMenu({
  navLinks,
  scrollToSection,
  isScrolled,
}: {
  navLinks: Array<{ label: string; href: string }>;
  scrollToSection: (href: string) => void;
  isScrolled: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    scrollToSection(href);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        aria-label="Toggle menu"
      >
        <span className={`w-6 h-px ${isScrolled ? "bg-[#2B2826]" : "bg-white"} ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`w-6 h-px ${isScrolled ? "bg-[#2B2826]" : "bg-white"} ${isOpen ? "opacity-0" : ""}`} />
        <span className={`w-6 h-px ${isScrolled ? "bg-[#2B2826]" : "bg-white"} ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 h-screen bg-[#FAF8F5] z-50 flex flex-col items-center justify-center"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-[#2B2826] text-3xl"
          >
            ×
          </button>

          {/* Logo */}
          <div className="mb-12">
            {/* ❌ removed white glow here too */}
            <img
              src={logoDark}
              alt="Laal Bindi Logo"
              className="w-24 h-auto object-contain"
            />
          </div>

          {/* Links */}
          <nav className="flex flex-col items-center gap-10">
            {navLinks.map((link, index) => (
              <motion.button
                key={index}
                onClick={() => handleLinkClick(link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-[26px] font-medium text-[#2B2826] hover:text-[#8B3A3A]"
              >
                {link.label}
              </motion.button>
            ))}
          </nav>
        </motion.div>
      )}
    </div>
  );
}