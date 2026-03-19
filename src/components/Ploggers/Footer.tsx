import {
  Mail,
  MapPin,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";

const footerLogo = "/images/Ploggers/sambhajinagar-logo-for-Website.png";

const Footer = () => {
  const quickLinks = [
    { label: "What is Plogging", href: "#what-is-plogging" },
    { label: "Why It Matters", href: "#why-it-matters" },
    { label: "What We Do", href: "#what-we-do" },
    { label: "Community", href: "#community" },
    { label: "Our Impact", href: "#impact" },
  ];

  return (
    <footer className="relative py-12 sm:py-16 bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white overflow-hidden">
      
      {/* Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container-wide px-4 sm:px-6 relative z-10">

        {/* MOBILE FIRST STACK */}
        <div className="flex flex-col gap-10 sm:grid sm:grid-cols-2 md:grid-cols-4 sm:gap-14 mb-12 sm:mb-16">

          {/* Brand */}
          <div className="text-center sm:text-left">
            <a href="/" className="inline-block mb-4">
              <img
                src={footerLogo}
                alt="Logo"
                className="h-12 sm:h-14 mx-auto sm:mx-0"
              />
            </a>
          </div>

          {/* Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-semibold mb-4 uppercase tracking-wide text-white">
              Explore
            </h4>

            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-emerald-400 transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-semibold mb-4 uppercase tracking-wide">
              Follow Us
            </h4>

            <div className="flex justify-center sm:justify-start gap-4">
              {[ 
                {
                  icon: Instagram,
                  link: "https://www.instagram.com/sambhajinagarploggers?igsh=Ymc2Z2p3Y2k5dmY0",
                },
                {
                  icon: Youtube,
                  link: "https://youtube.com/@vinitabhedyafoundation?si=zsrGLX30L7tzEy6q",
                },
                {
                  icon: Linkedin,
                  link: "https://www.linkedin.com/company/sambhajinagarploggers/",
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-white/5 hover:bg-emerald-500 transition"
                >
                  <item.icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-semibold mb-4 uppercase tracking-wide">
              Contact
            </h4>

            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Chh.+Sambhajinagar,+Maharashtra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center sm:justify-start gap-2 text-sm text-white/70 hover:text-emerald-400"
                >
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  Chh. Sambhajinagar
                </a>
              </li>

              <li>
                <a
                  href="mailto:admin@vinitabhedyafoundation.com"
                  className="flex items-center justify-center sm:justify-start gap-2 text-sm text-white/70 hover:text-emerald-400"
                >
                  <Mail className="w-4 h-4 text-emerald-400" />
                  Email Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-5 flex flex-col gap-3 sm:flex-row items-center justify-between text-center sm:text-left">

          <p className="text-xs sm:text-sm text-white/50">
            © {new Date().getFullYear()} Sambhajinagar Ploggers
          </p>

          <p className="text-xs sm:text-sm text-emerald-400 font-medium">
            Move • Clean • Repeat
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;