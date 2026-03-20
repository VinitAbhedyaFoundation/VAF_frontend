import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden z-0">

      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/Laalbindi/laalbindi_bg.jpeg"
          alt="Laal Bindi awareness campaign"
          className="w-full h-full object-cover scale-110 object-[center_8%]"
        />

        {/* Top gradient for navbar visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/55" />

        {/* Soft blur to hide classroom board text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[900px] h-[500px] bg-black/35 blur-[120px] rounded-full" />
        </div>
      </div>

      {/* Brand red aura glow */}
      <div className="absolute top-1/2 left-1/2 w-[420px] h-[420px] -translate-x-1/2 -translate-y-1/2 bg-[#8B3A3A]/30 rounded-full blur-[140px]" />

      {/* Content */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="max-w-4xl text-center z-10 px-6 pt-10"
      >

        {/* Eyebrow */}
<p className="text-xs tracking-[0.45em] uppercase text-white/70 mb-8 font-medium mt-6 md:mt-8">
          A Menstrual Health Awareness Initiative
        </p>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-semibold mb-8 leading-tight tracking-tight">
          Periods are normal.
          <br />
          <span className="text-[#E36A6A] italic font-medium">
            Silence isn't.
          </span>
        </h1>

        {/* Accent Divider */}
        <div className="w-20 h-[2px] bg-[#E36A6A] mx-auto mb-10 opacity-90" />

        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Breaking the stigma around menstruation through education,
            conversation, and compassion.
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
}