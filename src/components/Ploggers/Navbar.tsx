import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const logo = "/images/Ploggers/sambhajinagar-logo-for-Website.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll background effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll freeze fix
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
  }, [isMobileMenuOpen]);

  // ❌ Blog removed here
  const navLinks = [
    { label: "What is Plogging", href: "#what-is-plogging" },
    { label: "Why It Matters", href: "#why-it-matters" },
    { label: "What We Do", href: "#what-we-do" },
    { label: "Community", href: "#community" },
    { label: "Impact", href: "#impact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide px-6 py-5">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isMobileMenuOpen ? "opacity-0 pointer-events-none" : ""
          }`}
        >
          {/* Logo */}
          <a
            href="/"
            className="flex items-center transition-transform duration-300 hover:scale-105"
          >
            <img
              src={logo}
              alt="Sambhajinagar Ploggers Logo"
              className="h-16 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative group text-sm font-medium transition-colors duration-300 ${
                  isScrolled
                    ? "text-muted-foreground hover:text-primary"
                    : "text-white hover:text-emerald-300"
                }`}
              >
                {link.label}

                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${
                    isScrolled ? "bg-primary" : "bg-emerald-400"
                  }`}
                />
              </a>
            ))}

            <Button
              size="sm"
              className={`transition-all duration-300 hover:-translate-y-0.5 ${
                isScrolled
                  ? ""
                  : "bg-emerald-500 hover:bg-emerald-600 text-white"
              }`}
              asChild
            >
              <a href="#join">Join Us</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 transition-colors duration-300 ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col px-6 py-6">
          <div className="flex items-center justify-between mb-10">
            <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-black"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-lg font-medium text-gray-700 hover:text-black transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            <Button className="mt-6 w-fit" asChild>
              <a href="#join">Join Us</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;