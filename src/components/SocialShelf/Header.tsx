import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const logo = "/images/TSS/TSS-LOGO.png";
const googleFormLink = "https://forms.gle/AjoNYEgmrRgtrE5c9";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navItems = ["About", "Activities", "Values"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#1E4D4A]/95 backdrop-blur-lg shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <img
            src={logo}
            alt="The Social Shelf Logo"
            className={`transition-all duration-300 ${
              scrolled ? "h-9" : "h-11"
            }`}
          />
          <span className="text-lg md:text-xl font-display text-white tracking-tight">
            The Social Shelf
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-sm text-white hover:text-[#F2C185] transition group"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#F2C185] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          <a
            href={googleFormLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full text-sm bg-[#F2C185] text-white font-medium hover:bg-[#e6b06a]"
          >
            Join Us
          </a>
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 transition-all duration-300 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        {/* Menu Panel */}
        <div
          ref={menuRef}
          className={`absolute top-0 left-0 w-full bg-[#1E4D4A] transition-transform duration-300 ${
            menuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {/* Close button */}
          <div className="flex justify-end px-6 pt-6">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white"
            >
              <X size={30} />
            </button>
          </div>

          {/* Menu links */}
          <div className="flex flex-col items-center pb-10 gap-8">

            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-white text-lg hover:text-[#F2C185]"
              >
                {item}
              </a>
            ))}

            <a
              href={googleFormLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="px-8 py-3 rounded-full bg-[#F2C185] text-white font-medium hover:bg-[#e6b06a]"
            >
              Join Us
            </a>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;