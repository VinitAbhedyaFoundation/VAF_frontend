import { useState, useEffect } from "react";
import { Menu, X, Heart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const logo = "/images/VinitAbhedya/Logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const initiatives = [
  {
    label: "Sambhajinagar Ploggers",
    href: "/Ploggers",
  },
  {
    label: "Laal Bindi",
    href: "/laal-bindi",
  },
  {
    label: "Social Shelf",
    href: "/social-shelf",
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white border-b border-gray-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-20 px-6">
        
        {/* Logo */}
        <Link to="/" onClick={scrollToTop} className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
          <span
            className={`text-2xl font-serif tracking-wide ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            Vinit Abhedya Foundation
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 relative">

          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={scrollToTop}
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
            </Link>
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
          <Link to="/donate" onClick={scrollToTop}>
            <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 rounded-full px-7 py-2 transition-all duration-300 shadow-md hover:shadow-lg">
              <Heart className="w-4 h-4" /> Donate
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden ${scrolled ? "text-black" : "text-white"}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-base font-medium text-black py-2"
                  onClick={() => {
                    setOpen(false);
                    scrollToTop();
                  }}
                >
                  {link.label}
                </Link>
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

              <Link
                to="/donate"
                onClick={() => {
                  setOpen(false);
                  scrollToTop();
                }}
              >
                <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 rounded-full w-full mt-4">
                  <Heart className="w-4 h-4" /> Donate
                </Button>
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
