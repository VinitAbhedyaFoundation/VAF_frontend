import { Mail, MapPin, Instagram, Youtube, Phone, MessageCircle, Linkedin } from "lucide-react";

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
    <footer className="relative py-16 bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white overflow-hidden">

      {/* subtle nature glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="relative container-wide">

        {/* grid */}
        <div className="grid md:grid-cols-4 gap-14 mb-16">

          {/* Brand */}
          <div>
            <a
              href="/"
              className="inline-block mb-5 transition-transform duration-300 hover:scale-105"
            >
              <img
                src={footerLogo}
                alt="Chh. Sambhajinagar Ploggers Logo"
                className="h-14 w-auto object-contain"
              />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm tracking-wide uppercase">
              Explore
            </h4>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group relative text-sm text-white/70 hover:text-emerald-400 transition-colors duration-300"
                  >
                    {link.label}
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm tracking-wide uppercase">
              Follow Us
            </h4>

            <div className="flex items-center gap-4">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/sambhajinagarploggers?igsh=Ymc2Z2p3Y2k5dmY0"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-emerald-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
              >
                <Instagram className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@vinitabhedyafoundation?si=zsrGLX30L7tzEy6q"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-emerald-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
              >
                <Youtube className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/sambhajinagarploggers/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-emerald-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
              >
                <Linkedin className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
              </a>

              {/* WhatsApp (commented out) */}
              {/*
              <a
                href="https://wa.me/918856859643"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-emerald-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
              >
                <MessageCircle className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
              </a>
              */}

            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm tracking-wide uppercase">
              Contact
            </h4>

            <ul className="space-y-4">

              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Chh.+Sambhajinagar,+Maharashtra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-white/70 hover:text-emerald-400 transition-all duration-300"
                >
                  <MapPin className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                  Chh. Sambhajinagar, Maharashtra
                </a>
              </li>

              <li>
                <a
                  href="tel:+918856859643"
                  className="group flex items-center gap-3 text-sm text-white/70 hover:text-emerald-400 transition-all duration-300"
                >
                  <Phone className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                  +91 88568 59643
                </a>
              </li>

              <li>
                <a
                  href="mailto:admin@vinitabhedyafoundation.com"
                  className="group flex items-center gap-3 text-sm text-white/70 hover:text-emerald-400 transition-all duration-300"
                >
                  <Mail className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                  admin@vinitabhedyafoundation.com
                </a>
              </li>

            </ul>
          </div>

        </div>

        {/* bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-white/50 text-center md:text-left">
            © {new Date().getFullYear()} Chh. Sambhajinagar Ploggers — An
            initiative by Vinit Abhedya Foundation
          </p>

          <p className="text-sm text-emerald-400 font-medium">
            Move • Clean • Repeat
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;