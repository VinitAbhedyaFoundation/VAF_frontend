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
  { label: "Blog", href: "/blog", isRoute: true },
];

const initiatives = [
  { label: "Sambhajinagar Ploggers", href: "/ploggers" },
  { label: "Social Shelf", href: "/social-shelf" },
  { label: "Laal Bindi", href: "/laal-bindi" },
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white border-b border-gray-200 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4 md:px-6">

          {/* LOGO */}
          <Link to="/" onClick={scrollToTop} className="flex items-center gap-2 md:gap-3">
            <img src={logo} alt="Logo" className="h-10 md:h-14" />
            <span className={`font-serif text-lg md:text-xl ${scrolled ? "text-black" : "text-white"}`}>
              Vinit Abhedya Foundation
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8 relative">

            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={scrollToTop}
                  className={`text-sm font-medium transition ${
                    scrolled ? "text-black" : "text-white"
                  } hover:opacity-80`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`text-sm font-medium transition ${
                    scrolled ? "text-black" : "text-white"
                  } hover:opacity-80`}
                >
                  {link.label}
                </a>
              )
            )}

            {/* INITIATIVES */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className={`flex items-center gap-1 text-sm font-medium ${scrolled ? "text-black" : "text-white"}`}>
                Initiatives <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-4 w-60 bg-white shadow-xl rounded-lg border z-50"
                  >
                    {initiatives.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={scrollToTop}
                        className="block px-5 py-3 text-sm hover:bg-gray-100"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* LOGIN (TEXT ONLY) */}
            <Link
              to="/login"
              className={`text-sm font-medium transition ${
                scrolled ? "text-black" : "text-white"
              } hover:opacity-70`}
            >
              Login
            </Link>

            {/* DONATE (PRIMARY) */}
            <Link to="/donate">
              <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6">
                <Heart className="w-4 h-4 mr-2" />
                Donate
              </Button>
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className={`${scrolled ? "text-black" : "text-white"} lg:hidden`}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <img src={logo} className="h-10" />
              <button onClick={() => setOpen(false)}>
                <X className="w-6 h-6 text-black" />
              </button>
            </div>

            {/* LINKS */}
            <div className="flex flex-col px-6 py-8 gap-6">

              {navLinks.map((link) =>
                link.isRoute ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-lg font-medium text-black"
                    onClick={() => {
                      setOpen(false);
                      scrollToTop();
                    }}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-black"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      handleNavClick(link.href);
                    }}
                  >
                    {link.label}
                  </a>
                )
              )}

              {/* INITIATIVES */}
              <div>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex justify-between w-full text-sm font-semibold text-gray-500 uppercase"
                >
                  Initiatives
                  <ChevronDown className={`w-4 h-4 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className="mt-3 flex flex-col gap-2">
                    {initiatives.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="text-base text-black pl-3 py-1"
                        onClick={() => {
                          setOpen(false);
                          setDropdownOpen(false);
                          scrollToTop();
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* LOGIN (BUTTON FOR MOBILE) */}
              <Link to="/login" onClick={() => setOpen(false)}>
                <button className="w-full border border-black py-2 rounded-lg text-black">
                  Login
                </button>
              </Link>

              {/* DONATE */}
              <Link to="/donate" onClick={() => setOpen(false)}>
                <Button className="w-full mt-2 bg-green-600 text-white">
                  <Heart className="w-4 h-4 mr-2" />
                  Donate
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;