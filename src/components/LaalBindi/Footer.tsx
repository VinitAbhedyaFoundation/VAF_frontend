import { motion } from "framer-motion";
import { Mail, Instagram } from "lucide-react";

const logo = "/images/Laalbindi/LaalBindiLogo.png";

export function Footer() {
  const quickLinks = [
    { label: "About", href: "/laal-bindi/#about" },
    { label: "Why It Matters", href: "/laal-bindi/#why" },
    { label: "What We Do", href: "/laal-bindi/#what" },
    { label: "Myth vs Truth", href: "/laal-bindi/#myths" },
    { label: "Get Involved", href: "/laal-bindi/#involved" },
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
              <img
                src={logo}
                alt="Laal Bindi"
                className="h-10 w-auto"
              />
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
              <a
                href="https://www.instagram.com/laal.bindii?igsh=MXAwZHY4eTd3bWp3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Laal Bindi on Instagram"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#8B3A3A] transition"
              >
                <Instagram
                  className="w-5 h-5"
                  aria-hidden="true"
                />
              </a>
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
              <a
                href="mailto:admin@vinitabhedyafoundation.com"
                className="flex items-center gap-3 text-sm text-[#E8E4DF]/80 hover:text-[#A85555] transition"
              >
                <Mail
                  className="w-5 h-5 text-[#A85555] shrink-0"
                  aria-hidden="true"
                />
                admin@vinitabhedyafoundation.com
              </a>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-[#FAF8F5]/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#E8E4DF]/60">
            © {new Date().getFullYear()} Laal Bindi — An initiative by Vinit
            Abhedya Foundation
          </p>

          <p className="text-sm text-[#A85555] font-medium">
            Breaking Stigma • Building Dignity
          </p>
        </div>
      </div>
    </footer>
  );
}