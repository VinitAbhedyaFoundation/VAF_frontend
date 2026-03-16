import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
const logo = "/images/Ploggers/sambhajinagar-logo-for-Website.png";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <div className="flex items-center justify-between">

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
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
<div
  className="
  absolute top-full left-4 right-4
  bg-white
  rounded-2xl
  p-6
  shadow-xl
  border border-emerald-100
  max-w-[calc(100vw-2rem)]
  "
>            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-base font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              <Button
                variant="default"
                className="w-fit mt-2 transition-all duration-300 hover:-translate-y-0.5"
                asChild
              >
                <a href="#join">Join Us</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;