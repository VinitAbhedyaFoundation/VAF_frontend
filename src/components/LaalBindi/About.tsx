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
      {/* subtle background atmosphere */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#8B3A3A]/10 blur-[140px] rounded-full"></div>

      <div className="relative max-w-7xl grid lg:grid-cols-2 gap-16 items-center">

        {/* TEXT SIDE */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="max-w-xl"
        >
          {/* divider */}
          <motion.div
            variants={item}
            className="h-0.5 w-16 bg-[#8B3A3A] mb-10"
          />

          {/* title */}
          <motion.h2
            variants={item}
            className="text-3xl md:text-5xl lg:text-6xl text-[#2B2826] mb-10 leading-tight"
          >
            About <span className="italic text-[#8B3A3A]">Laal Bindi</span>
          </motion.h2>

          {/* updated paragraphs */}
          <div className="space-y-8 text-lg md:text-xl text-[#2B2826] leading-relaxed">
            
            <motion.p variants={item} className="opacity-90">
              Laal Bindi is a movement that promotes dignity, awareness, and open conversations about menstruation. 
              We believe periods are a natural part of life and should never be hidden or treated with shame. 
              Through this initiative, we aim to break silence and challenge the myths surrounding menstruation.
            </motion.p>

            <motion.p variants={item} className="opacity-90">
              The idea grew from conversations with women and girls across communities who shared their experiences 
              of stigma and challenges. Through awareness sessions, educational programs, and community engagement, 
              we create safe spaces where people can ask questions, learn freely, and speak openly.
            </motion.p>

            <motion.p variants={item} className="opacity-90">
              The red bindi, a symbol of strength and identity, represents our mission—to turn silence into conversation, 
              shame into confidence, and stigma into support.
            </motion.p>

          </div>
        </motion.div>

        {/* IMAGE SIDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9 }}
          className="relative group"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/Laalbindi/about.jpeg"
              alt="Laal Bindi awareness session"
              className="w-full h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* soft brand glow */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#8B3A3A]/20 rounded-full blur-3xl"></div>
        </motion.div>

      </div>
    </section>
  );
}