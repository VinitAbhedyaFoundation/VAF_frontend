import { motion } from "framer-motion";
import {
  Heart,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const linkClass =
    "relative text-sm text-gray-400 transition-colors duration-300 group-hover:text-white";

  const underline =
    "absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full";

  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black text-gray-400 pt-20 pb-12"
    >
      {/* Glow */}
      <motion.div
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">

          {/* HELP */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-widest">
              Help
            </h4>

            <ul className="space-y-3">
              <li className="group cursor-pointer w-fit">
                <a href="#contact" className={linkClass}>
                  Contact Us
                  <span className={underline}></span>
                </a>
              </li>

              <li className="group cursor-pointer w-fit">
                <a href="#faq" className={linkClass}>
                  Frequently Asked Questions
                  <span className={underline}></span>
                </a>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-widest">
              Newsletter
            </h4>

            <p className="text-sm mb-6 text-gray-500">
              Get updates about initiatives, impact stories, and upcoming events.
            </p>

            <div className="flex border-b border-gray-700 pb-3 focus-within:border-white transition-colors">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent flex-1 text-sm text-white placeholder-gray-600 outline-none"
              />

              <button
                onClick={() => {
                  if (!email) return;

                  // future: send to backend
                  navigate("/newsletter-success");
                }}
                className="text-sm text-white font-medium ml-4 relative group"
              >
                SIGN UP
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all group-hover:w-full"></span>
              </button>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-widest">
              Contact
            </h4>

            <div className="space-y-3">
              <a
                href="mailto:admin@vinitabhedyafoundation.com"
                className="flex items-center gap-3 text-sm text-gray-500 hover:text-white transition group w-fit"
              >
                <span className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg">
                  <Mail className="w-4 h-4" />
                </span>
                admin@vinitabhedyafoundation.com
              </a>

              <a
                href="https://maps.google.com/?q=Chh.+Sambhajinagar,+Maharashtra"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-500 hover:text-white transition group w-fit"
              >
                <span className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg">
                  <MapPin className="w-4 h-4" />
                </span>
                Chh. Sambhajinagar, Maharashtra
              </a>
            </div>
          </div>
        </div>

        {/* SECOND GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">

          {/* LEGAL */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-widest">
              Legal
            </h4>

            <ul className="space-y-3">
              <li className="group w-fit">
                <a
                  href="/legal/Privacy Policy VAF.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Privacy Policy
                  <span className={underline}></span>
                </a>
              </li>

              <li className="group w-fit">
                <a
                  href="/legal/Terms and conditions VAF.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Terms & Conditions
                  <span className={underline}></span>
                </a>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-widest">
              Social
            </h4>

            <div className="flex gap-5">
              <a href="https://www.instagram.com/vinitabhedyafoundation" target="_blank">
                <Instagram className="w-5 h-5 hover:text-white" />
              </a>
              <a href="https://x.com/MH20PLOGGERS" target="_blank">
                <Twitter className="w-5 h-5 hover:text-white" />
              </a>
              <a href="https://www.linkedin.com/company/sambhajinagarploggers/" target="_blank">
                <Linkedin className="w-5 h-5 hover:text-white" />
              </a>
              <a href="https://www.facebook.com/share/1DnSdfrGCj/" target="_blank">
                <Facebook className="w-5 h-5 hover:text-white" />
              </a>
              <a href="https://youtube.com/@vinitabhedyafoundation" target="_blank">
                <Youtube className="w-5 h-5 hover:text-white" />
              </a>
            </div>
          </div>

          <div></div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-500">
          <p>
            © 2026 Vinit Abhedya Foundation. Made with{" "}
            <Heart className="inline w-3 h-3 text-red-500 animate-pulse" /> for
            a better world.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;