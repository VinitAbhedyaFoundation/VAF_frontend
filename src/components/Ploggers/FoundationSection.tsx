import { ExternalLink } from "lucide-react";

const foundationLogo = "/images/VinitAbhedya/Logo.png";

const FoundationSection = () => {
  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-b from-white via-emerald-50/60 to-white">

      {/* background glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-200/30 blur-[160px] rounded-full"></div>

      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* divider */}
          <div className="flex items-center justify-center gap-4 mb-8 opacity-70">
            <div className="w-16 h-[1px] bg-emerald-300"></div>
            <span className="text-xs font-semibold text-emerald-700 tracking-[0.25em] uppercase">
              An Initiative By
            </span>
            <div className="w-16 h-[1px] bg-emerald-300"></div>
          </div>

          {/* logo */}
          <div className="flex justify-center mb-6">
            <img
              src={foundationLogo}
              alt="Vinit Abhedya Foundation Logo"
              className="h-16 w-auto object-contain opacity-90"
            />
          </div>

          {/* title */}
          <h3 className="text-3xl sm:text-4xl font-bold text-green-900 mb-6">
            Vinit Abhedya Foundation
          </h3>

          {/* description */}
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Chh. Sambhajinagar Ploggers is a grassroots environmental initiative
            under the Vinit Abhedya Foundation, working to create healthier,
            cleaner, and more connected communities through collective action.
          </p>

        <p className="text-emerald-700 font-medium mt-6">
  For more information
</p>

<p className="text-emerald-800 font-semibold">
  Visit the official Vinit Abhedya Foundation website
</p>
        </div>
      </div>
    </section>
  );
};

export default FoundationSection;