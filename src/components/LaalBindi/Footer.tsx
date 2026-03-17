import { motion } from "framer-motion";
import { Mail, Instagram, Phone } from "lucide-react";

const logo = "/images/Laalbindi/LaalBindiLogo.png";

export function Footer() {
  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Why It Matters", href: "#why" },
    { label: "What We Do", href: "#what" },
    { label: "Myth vs Truth", href: "#myths" },
    { label: "Get Involved", href: "#involved" },
  ];

  return (
    <footer className="bg-[#2B2826] text-[#FAF8F5] pt-16 pb-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* GRID */}
        <div className="grid md:grid-cols-4 gap-12 mb-14">

          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Laal Bindi" className="h-10 w-auto" />
              <span className="text-xl font-medium">Laal Bindi</span>
            </div>

          
          </motion.div>

          {/* EXPLORE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold mb-5 tracking-wider uppercase">
              Explore
            </h4>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#E8E4DF]/80 hover:text-[#A85555] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* FOLLOW US */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold mb-5 tracking-wider uppercase">
              Follow Us
            </h4>

            <div className="flex items-center gap-4">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/laal.bindii?igsh=MXAwZHY4eTd3bWp3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#8B3A3A] transition"
              >
                <Instagram className="w-5 h-5" />
              </a>

              {/* WhatsApp (commented out) */}
              {/*
              <a
                href="https://wa.me/918856859643"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#8B3A3A] transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.04 2C6.52 2 2.06 6.46 2.06 11.98c0 1.9.5 3.73 1.45 5.33L2 22l4.82-1.44c1.55.85 3.3 1.3 5.08 1.3h.01c5.52 0 9.98-4.46 9.98-9.98S17.56 2 12.04 2zm0 18.16c-1.63 0-3.23-.44-4.62-1.27l-.33-.2-2.86.85.86-2.78-.21-.34a8.12 8.12 0 01-1.24-4.34c0-4.5 3.66-8.16 8.16-8.16 4.5 0 8.16 3.66 8.16 8.16s-3.66 8.16-8.16 8.16z"/>
                </svg>
              </a>
              */}

            </div>
          </motion.div>

          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 className="text-sm font-semibold mb-5 tracking-wider uppercase">
              Contact
            </h4>

            <div className="space-y-4">

              {/* Phone */}
              <a
                href="tel:+918856859643"
                className="flex items-center gap-3 text-sm text-[#E8E4DF]/80 hover:text-[#A85555] transition"
              >
                <Phone className="w-5 h-5 text-[#A85555] shrink-0" />
                +91 88568 59643
              </a>

              {/* Email */}
              <a
                href="mailto:admin@vinitabhedyafoundation.com"
                className="flex items-center gap-3 text-sm text-[#E8E4DF]/80 hover:text-[#A85555] transition"
              >
                <Mail className="w-5 h-5 text-[#A85555] shrink-0" />
                admin@vinitabhedyafoundation.com
              </a>

              {/* WhatsApp (commented out) */}
              {/*
              <a
                href="https://wa.me/918856859643"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[#E8E4DF]/80 hover:text-[#A85555] transition"
              >
                <svg
                  className="w-5 h-5 text-[#A85555] shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.04 2C6.52 2 2.06 6.46 2.06 11.98c0 1.9.5 3.73 1.45 5.33L2 22l4.82-1.44c1.55.85 3.3 1.3 5.08 1.3h.01c5.52 0 9.98-4.46 9.98-9.98S17.56 2 12.04 2zm0 18.16c-1.63 0-3.23-.44-4.62-1.27l-.33-.2-2.86.85.86-2.78-.21-.34a8.12 8.12 0 01-1.24-4.34c0-4.5 3.66-8.16 8.16-8.16 4.5 0 8.16 3.66 8.16 8.16s-3.66 8.16-8.16 8.16z"/>
                </svg>
                Chat on WhatsApp
              </a>
              */}

            </div>
          </motion.div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-[#FAF8F5]/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-[#E8E4DF]/60">
            © {new Date().getFullYear()} Laal Bindi — An initiative by Vinit Abhedya Foundation
          </p>

          <p className="text-sm text-[#A85555] font-medium">
            Breaking Stigma • Building Dignity
          </p>

        </div>

      </div>
    </footer>
  );
}