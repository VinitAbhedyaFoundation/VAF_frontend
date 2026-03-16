import { useState, useEffect } from "react";
import { Menu, X, Heart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const logo = "/images/VinitAbhedya/Logo.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const initiatives = [
  {
    label: "Sambhajinagar Ploggers",
    href: "/ploggers",
  },
  {
    label: "Social Shelf",
    href: "/social-shelf",
   
  },
  {
    label: "Laal Bindi",
    href: "/laal-bindi",
  },
  {
    label: "Laal Bindi",
    href: "/laal-bindi",
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white border-b border-gray-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4 md:px-6">

        {/* Logo + Foundation Name */}
        <Link
          to="/"
          onClick={scrollToTop}
          className="flex items-center gap-2 md:gap-3"
        >
          <img src={logo} alt="Logo" className="h-10 md:h-14 w-auto" />

          {/* Full name desktop */}
          <span
            className={`hidden sm:block whitespace-nowrap font-serif tracking-wide text-base sm:text-lg md:text-xl ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            Vinit Abhedya Foundation
          </span>

          {/* Short name mobile */}
          <span
            className={`sm:hidden font-serif text-lg ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            Vinit Abhedya Foundation
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10 relative">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className={`text-sm font-medium relative group transition-all duration-300 ${
                scrolled ? "text-black" : "text-white"
              }`}
            >
              {link.label}

              <span
                className={`absolute left-0 -bottom-1 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${
                  scrolled ? "bg-black" : "bg-white"
                }`}
              ></span>
            </a>
          ))}

          {/* Initiatives Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className={`flex items-center gap-1 text-sm font-medium relative group ${
                scrolled ? "text-black" : "text-white"
              }`}
            >
              Initiatives
              <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />

              <span
                className={`absolute left-0 -bottom-1 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${
                  scrolled ? "bg-black" : "bg-white"
                }`}
              ></span>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-4 w-60 bg-white shadow-xl rounded-lg border border-gray-200"
                >
                  <div className="py-2">
                    {initiatives.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={scrollToTop}
                        className="block px-5 py-3 text-sm text-black hover:bg-gray-100 transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Donate Button */}
          <a
            href="#donate"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#donate");
            }}
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 rounded-full px-7 py-2 transition-all duration-300 shadow-md hover:shadow-lg">
              <Heart className="w-4 h-4" /> Donate
            </Button>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`${scrolled ? "text-black" : "text-white"} lg:hidden`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed top-20 left-0 w-full bg-white shadow-xl border-t border-gray-200 z-40"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-black py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    handleNavClick(link.href);
                  }}
                >
                  {link.label}
                </a>
              ))}

              <div className="mt-4 font-semibold text-black">
                Initiatives
              </div>

              {initiatives.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm text-black py-2 pl-4"
                  onClick={() => {
                    setOpen(false);
                    scrollToTop();
                  }}
                >
                  {item.label}
                </Link>
              ))}

              <a
                href="#donate"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  handleNavClick("#donate");
                }}
              >
                <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 rounded-full w-full mt-4">
                  <Heart className="w-4 h-4" /> Donate
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;