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

const Footer = () => {
  return (
    <footer
      className="
        relative
        overflow-hidden
        bg-black
        text-gray-400
        pt-16
        pb-10
      "
    >
      {/* kill any inherited pseudo elements */}
      <div className="absolute inset-0 bg-black pointer-events-none" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* ROW 1 */}
          <div className="grid lg:grid-cols-3 gap-10 mb-16">
            {/* ABOUT */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                About Us
              </h4>
              <ul className="space-y-2 text-sm">
                <li>Community Initiatives</li>
                <li>Environmental Action</li>
                <li>Women Empowerment</li>
                <li>Careers</li>
              </ul>
            </div>

            {/* HELP */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                Help
              </h4>
              <ul className="space-y-2 text-sm">
                <li>Contact Us</li>
                <li>Frequently Asked Questions</li>
                <li>Volunteer Support</li>
                <li>Partnerships</li>
              </ul>
            </div>

            {/* NEWSLETTER */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                Newsletter
              </h4>
              <p className="text-sm mb-4">
                Sign up to receive updates on our initiatives, events, and impact.
              </p>
              <div className="flex border-b border-gray-600 pb-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-transparent flex-1 text-sm text-white placeholder-gray-500 outline-none"
                />
                <button className="text-sm text-white font-medium ml-4">
                  SIGN UP
                </button>
              </div>
            </div>
          </div>

          {/* ROW 2 */}
          <div className="grid lg:grid-cols-3 gap-10 mb-14">
            {/* LEGAL */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                Legal
              </h4>
              <ul className="space-y-2 text-sm">
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
                <li>Accessibility Statement</li>
                <li>Responsible Practices</li>
              </ul>
            </div>

            {/* SOCIAL */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                Social
              </h4>
              <div className="flex gap-4">
                <Facebook className="w-5 h-5 hover:text-white cursor-pointer" />
                <Instagram className="w-5 h-5 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 hover:text-white cursor-pointer" />
                <Youtube className="w-5 h-5 hover:text-white cursor-pointer" />
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                Contact Us
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  admin@vinitabhedyafoundation.com
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +91 88568 59643
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Chh. Sambhajinagar, Maharashtra
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-6 text-center text-xs text-gray-500">
            © 2026 Vinit Abhedya Foundation. Made with{" "}
            <Heart className="inline w-3 h-3 text-red-500" />  for a better world.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
