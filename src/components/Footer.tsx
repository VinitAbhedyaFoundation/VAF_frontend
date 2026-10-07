import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  AlertCircle,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import API from "@/api/api";

const Footer = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const linkClass =
    "relative text-sm text-gray-400 transition-colors duration-300 group-hover:text-white";

  const underline =
    "absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full";

  const handleSubscribe = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setErrorMessage("Please enter your email address.");
      setShowErrorModal(true);
      return;
    }

    setIsSubscribing(true);

    try {
      await API.post("/newsletter/subscribe", {
        email: trimmedEmail,
      });

      setEmail("");
      navigate("/newsletter-success");
    } catch (error: any) {
      console.error("Newsletter subscription failed:", error);

      setErrorMessage(
        error?.response?.data?.message ||
          "We couldn't complete your subscription right now. Please try again."
      );

      setShowErrorModal(true);
    } finally {
      setIsSubscribing(false);
    }
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <>
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
                  <a href="/#faq" className={linkClass}>
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
                Get updates about initiatives, impact stories, and upcoming
                events.
              </p>

              <div className="flex border-b border-gray-700 pb-3 focus-within:border-white transition-colors">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>

                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubscribe();
                    }
                  }}
                  disabled={isSubscribing}
                  autoComplete="email"
                  className="bg-transparent flex-1 text-sm text-white placeholder-gray-600 outline-none disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={handleSubscribe}
                  disabled={isSubscribing || !email.trim()}
                  className="text-sm text-white font-medium ml-4 relative group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubscribing ? "SUBSCRIBING..." : "SIGN UP"}

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
                    <Mail className="w-4 h-4" aria-hidden="true" />
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
                    <MapPin className="w-4 h-4" aria-hidden="true" />
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
                <a
                  href="https://www.instagram.com/vinitabhedyafoundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Vinit Abhedya Foundation on Instagram"
                >
                  <Instagram
                    className="w-5 h-5 hover:text-white"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href="https://x.com/MH20PLOGGERS"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Vinit Abhedya Foundation on X"
                >
                  <Twitter
                    className="w-5 h-5 hover:text-white"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href="https://www.linkedin.com/company/sambhajinagarploggers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Vinit Abhedya Foundation on LinkedIn"
                >
                  <Linkedin
                    className="w-5 h-5 hover:text-white"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href="https://www.facebook.com/share/1DnSdfrGCj/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Vinit Abhedya Foundation on Facebook"
                >
                  <Facebook
                    className="w-5 h-5 hover:text-white"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href="https://youtube.com/@vinitabhedyafoundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Vinit Abhedya Foundation on YouTube"
                >
                  <Youtube
                    className="w-5 h-5 hover:text-white"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>

            <div></div>
          </div>

          {/* BOTTOM */}
          <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-500">
            <p>
              © 2026 Vinit Abhedya Foundation. Made with{" "}
              <Heart
                className="inline w-3 h-3 text-red-500 animate-pulse"
                aria-hidden="true"
              />{" "}
              for a better world.
            </p>
          </div>
        </div>
      </motion.footer>

      {/* NEWSLETTER ERROR MODAL */}
      <AnimatePresence>
        {showErrorModal && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closeErrorModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl"
            >
              {/* Top glow */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />

              {/* Close button */}
              <button
                type="button"
                onClick={closeErrorModal}
                className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>

              <div className="relative px-6 py-8 sm:px-8 sm:py-9 text-center">
                {/* Icon */}
                <div className="flex justify-center mb-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-red-400/20 bg-red-500/10">
                    <AlertCircle
                      className="h-7 w-7 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Heading */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  Subscription Unsuccessful
                </h3>

                {/* Message */}
                <p className="text-sm leading-relaxed text-gray-400 max-w-sm mx-auto">
                  {errorMessage}
                </p>

                {/* Button */}
                <button
                  type="button"
                  onClick={closeErrorModal}
                  className="mt-7 w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
                >
                  Try Again
                </button>

                <p className="mt-4 text-xs text-gray-600">
                  If the problem continues, please try again later.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;