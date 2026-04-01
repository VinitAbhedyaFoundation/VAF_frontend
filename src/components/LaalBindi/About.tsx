import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-24 md:py-32 bg-[#F6F3F1] overflow-hidden"
    >
      {/* background */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#8B3A3A]/10 blur-[140px] rounded-full"></div>

      <div className="relative max-w-7xl grid lg:grid-cols-2 gap-16 items-center">

        {/* TEXT */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="max-w-xl"
        >
          <motion.div
            variants={item}
            className="h-0.5 w-16 bg-[#8B3A3A] mb-10"
          />

          {/* SEO heading */}
          <motion.h2
            variants={item}
            className="text-3xl md:text-5xl lg:text-6xl text-[#2B2826] mb-10 leading-tight"
          >
            About{" "}
            <span className="italic text-[#8B3A3A]">
              Laal Bindi Initiative
            </span>
          </motion.h2>

          {/* SEO content */}
          <div className="space-y-8 text-lg md:text-xl text-[#2B2826] leading-relaxed">

            <motion.p variants={item} className="opacity-90">
              Laal Bindi is a menstrual awareness and health education initiative 
              working in{" "}
              <span className="text-[#8B3A3A] font-medium">
                Chhatrapati Sambhajinagar
              </span>{" "}
              to break stigma and promote open conversations around periods.
            </motion.p>

            <motion.p variants={item} className="opacity-90">
              Through awareness sessions, school programs, and community engagement, 
              the initiative focuses on menstrual hygiene education, body literacy, 
              and creating safe spaces where girls and women can ask questions freely.
            </motion.p>

            <motion.p variants={item} className="opacity-90">
              Laal Bindi represents dignity, confidence, and the right to knowledge. 
              It aims to replace silence with understanding and stigma with informed awareness.
            </motion.p>

          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9 }}
          className="relative group"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/Laalbindi/about.jpeg"
              alt="Menstrual awareness session by Laal Bindi initiative in Sambhajinagar"
              className="w-full h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#8B3A3A]/20 rounded-full blur-3xl"></div>
        </motion.div>

      </div>
    </section>
  );
}