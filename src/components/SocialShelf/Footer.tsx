import { Facebook, Instagram, Twitter } from "lucide-react";

const volunteerForm = "https://forms.gle/AjoNYEgmrRgtrE5c9";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0B1F1E] to-[#071312] text-white py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Top Grid */}
        <div className="grid md:grid-cols-4 gap-10 md:gap-16">

          {/* Brand */}
          <div>
            <p className="font-display text-xl md:text-2xl font-semibold text-[#FFF8EE]">
              Social Shelf
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="text-sm tracking-widest text-white/70 mb-4">
              EXPLORE
            </p>

            <div className="flex flex-col gap-3 text-sm">
              {[
                { name: "About", href: "#about" },
                { name: "Activities", href: "#activities" },
                { name: "Values", href: "#values" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative w-fit text-white/60 hover:text-[#C2410C] transition duration-300 group"
                >
                  {item.name}
                  <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#C2410C] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}

              <a
                href={volunteerForm}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-fit text-white/60 hover:text-[#C2410C] transition duration-300 group"
              >
                Join
                <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#C2410C] transition-all duration-300 group-hover:w-full" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm tracking-widest text-white/70 mb-4">
              CONTACT
            </p>

            <div className="flex flex-col gap-3 text-sm text-white/60">
              <p>Chh. Sambhajinagar, Maharashtra</p>
              <p>+91 88568 59643</p>
              <p>admin@vinitabhedyafoundation.com</p>
            </div>
          </div>

          {/* Socials */}
          <div>
            <p className="text-sm tracking-widest text-white/70 mb-4">
              FOLLOW US
            </p>

            <div className="flex gap-4">

              <a
                href="https://www.instagram.com/the_socialshelf?igsh=MWRtdnVuNnVuOHZlNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full 
                bg-white/5 backdrop-blur-md border border-white/10 
                hover:bg-[#C2410C]/20 hover:border-[#C2410C]/40 
                transition duration-300 group"
              >
                <Instagram className="w-4 h-4 text-white/70 group-hover:text-white" />
              </a>

              <a
                href="https://www.facebook.com/share/1DnSdfrGCj/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full 
                bg-white/5 backdrop-blur-md border border-white/10 
                hover:bg-[#C2410C]/20 hover:border-[#C2410C]/40 
                transition duration-300 group"
              >
                <Facebook className="w-4 h-4 text-white/70 group-hover:text-white" />
              </a>

              <a
                href="https://x.com/MH20PLOGGERS"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full 
                bg-white/5 backdrop-blur-md border border-white/10 
                hover:bg-[#C2410C]/20 hover:border-[#C2410C]/40 
                transition duration-300 group"
              >
                <Twitter className="w-4 h-4 text-white/70 group-hover:text-white" />
              </a>

            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-12 h-px bg-white/10" />

        {/* Bottom */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-xs text-white/50 gap-3">

          <p>
            © {new Date().getFullYear()} Social Shelf — A Vinit Abhedya Foundation Initiative
          </p>

          <p className="text-[#C2410C]">
            Read • Reflect • Connect
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;