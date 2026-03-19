import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const foundationLogo = "/images/VinitAbhedya/Logo.png";

 function Foundation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative min-h-[65vh] flex items-center justify-center px-6 md:px-12 py-20 md:py-24 bg-[#E8E4DF] overflow-hidden"
    >

      {/* soft glow background */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#8B3A3A]/10 blur-[140px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative max-w-4xl text-center"
      >

        {/* divider */}
        <div className="flex items-center justify-center gap-4 mb-10 opacity-80">
          <div className="w-14 h-[1px] bg-[#8B3A3A]/40"></div>
          <span className="text-xs md:text-sm text-[#736D6A] uppercase tracking-[0.3em]">
            An Initiative By
          </span>
          <div className="w-14 h-[1px] bg-[#8B3A3A]/40"></div>
        </div>

        {/* foundation logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <img
            src={foundationLogo}
            alt="Vinit Abhedya Foundation"
            className="h-16 md:h-20 object-contain"
          />
        </motion.div>

        {/* title */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl text-[#2B2826] mb-8 leading-tight">
          Vinit Abhedya{" "}
          <span className="italic text-[#8B3A3A]">Foundation</span>
        </h2>

        {/* description */}
        <div className="max-w-2xl mx-auto space-y-5 text-base md:text-lg text-[#2B2826] leading-relaxed">
          <p className="opacity-90">
            The Vinit Abhedya Foundation is dedicated to creating meaningful
            social impact through education, awareness, and community
            empowerment.
          </p>
        </div>

        {/* bottom divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "4rem" } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="h-[2px] bg-[#8B3A3A] mt-10 mx-auto rounded-full"
        />

      </motion.div>
    </section>
  );
}

export default Foundation;