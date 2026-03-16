import { motion } from "framer-motion";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

const socials = [
  {
    icon: Facebook,
    url: "https://www.facebook.com/share/1DnSdfrGCj/",
  },
  {
    icon: Instagram,
    url: "https://www.instagram.com/vinitabhedyafoundation?igsh=MXN2cDI3cTNpcGRxeA==",
  },
  {
    icon: Twitter,
    url: "https://x.com/MH20PLOGGERS",
  },
  {
    icon: Youtube,
    url: "https://www.youtube.com/@VinitAbhedyaFoundation",
  },
];

const Footer = () => {
  const linkClass =
    "relative text-sm text-gray-400 transition-colors duration-300 group-hover:text-white";

  const underline =
    "absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full";

  return (
    <motion.footer id="contact"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="
        relative
        overflow-hidden
        bg-gradient-to-b from-black via-zinc-950 to-black
        text-gray-400
        pt-20
        pb-12
      "
    >
      {/* Floating Glow */}
      <motion.div
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"
      />

      <div className="relative container mx-auto px-6">
        <div className="max-w-6xl mx-auto">

          {/* ROW 1 */}
          <div className="grid lg:grid-cols-3 gap-12 mb-20">

            {/* ABOUT */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-widest">
                About Us
              </h4>
              <ul className="space-y-3">
                {[
                  "Community Initiatives",
                  "Environmental Action",
                  "Women Empowerment",
                  "Careers",
                ].map((item, i) => (
                  <li key={i} className="group cursor-pointer w-fit">
                    <span className={linkClass}>
                      {item}
                      <span className={underline}></span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* HELP */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-widest">
                Help
              </h4>
              <ul className="space-y-3">
                {[
                  "Contact Us",
                  "Frequently Asked Questions",
                  "Volunteer Support",
                  "Partnerships",
                ].map((item, i) => (
                  <li key={i} className="group cursor-pointer w-fit">
                    <span className={linkClass}>
                      {item}
                      <span className={underline}></span>
                    </span>
                  </li>
                ))}
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

              <div className="flex border-b border-gray-700 pb-3 focus-within:border-white transition-colors duration-300">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-transparent flex-1 text-sm text-white placeholder-gray-600 outline-none"
                />
                <button className="text-sm text-white font-medium ml-4 relative group">
                  SIGN UP
                  <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </button>
              </div>
            </div>
          </div>

          {/* ROW 2 */}
          <div className="grid lg:grid-cols-3 gap-12 mb-16">

            {/* LEGAL */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-widest">
                Legal
              </h4>

              <ul className="space-y-3">
                <li className="group w-fit">
                  <a
                    href="/legal/privacy-policy.pdf"
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
                    href="/legal/terms-and-conditions.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    Terms & Conditions
                    <span className={underline}></span>
                  </a>
                </li>

                <li className="group cursor-pointer w-fit">
                  <span className={linkClass}>
                    Accessibility Statement
                    <span className={underline}></span>
                  </span>
                </li>

                <li className="group cursor-pointer w-fit">
                  <span className={linkClass}>
                    Responsible Practices
                    <span className={underline}></span>
                  </span>
                </li>
              </ul>
            </div>

            {/* SOCIAL */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-widest">
                Social
              </h4>
              <div className="flex gap-4">
  <a
    href="https://www.facebook.com/share/1DnSdfrGCj/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Facebook className="w-5 h-5 hover:text-white cursor-pointer" />
  </a>            
        <a
    href="https://www.instagram.com/vinitabhedyafoundation?igsh=MXN2cDI3cTNpcGRxeA=="
    target="_blank"
    rel="noopener noreferrer"
  >
    <Instagram className="w-5 h-5 hover:text-white cursor-pointer" />
  </a>

  <a href="https://x.com/MH20PLOGGERS" 
  target="_blank"
  rel="noopener noreferrer">
    <Twitter className="w-5 h-5 hover:text-white cursor-pointer" />
  </a>

  <a href="https://youtube.com/@vinitabhedyafoundation?si=f0kLwicxugGsuax3"
   target="_blank"
    rel="noopener noreferrer">
    <Youtube className="w-5 h-5 hover:text-white cursor-pointer" />
  </a>
</div>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-widest">
                Contact Us
              </h4>

              <div className="space-y-4 text-sm text-gray-500">
                <div className="flex items-center gap-3 hover:text-white transition-colors duration-300 cursor-pointer">
                  <Mail className="w-4 h-4" />
                  admin@vinitabhedyafoundation.com
                </div>

                <div className="flex items-center gap-3 hover:text-white transition-colors duration-300 cursor-pointer">
                  <Phone className="w-4 h-4" />
                  +91 88568 59643
                </div>

                <div className="flex items-center gap-3 hover:text-white transition-colors duration-300 cursor-pointer">
                  <MapPin className="w-4 h-4" />
                  Chh. Sambhajinagar, Maharashtra
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-500">
            <p className="tracking-wide">
              © 2026 Vinit Abhedya Foundation. Made with{" "}
              <Heart className="inline w-3 h-3 text-red-500 animate-pulse" /> for a better world.
            </p>
          </div>

        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
