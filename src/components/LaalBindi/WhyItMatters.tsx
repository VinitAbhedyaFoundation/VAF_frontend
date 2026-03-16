import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function WhyItMatters() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    {
      number: "71%",
      text: "of girls in India remain unaware of menstruation until their first period"
    },
    {
      number: "23%",
      text: "of girls drop out of school after reaching puberty due to lack of menstrual hygiene facilities"
    },
    {
      number: "Many",
      text: "face restrictions, isolation, and shame during their periods"
    }
  ];

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 }
    }
  };

  return (
    <section
      id="why"
      ref={ref}
      className="relative min-h-[70vh] flex items-center justify-center px-6 md:px-12 py-20 md:py-24 bg-[#E8E4DF] overflow-hidden"
    >
      {/* soft brand glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#8B3A3A]/10 blur-[140px] rounded-full"></div>

      <div className="relative max-w-6xl w-full">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-[#2B2826] mb-16 leading-tight text-center">
            Why This{" "}
            <span className="italic text-[#8B3A3A]">Matters</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid md:grid-cols-3 gap-8 md:gap-10"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-[#d9d4cf] shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="text-5xl md:text-6xl lg:text-7xl text-[#8B3A3A] mb-5 tracking-tight font-semibold">
                {stat.number}
              </div>

              <p className="text-lg md:text-xl text-[#2B2826] leading-relaxed opacity-90">
                {stat.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center mt-14 text-lg md:text-xl text-[#736D6A] max-w-2xl mx-auto leading-relaxed italic"
        >
          These aren't just numbers. They represent lives shaped by silence,
          misinformation, and preventable hardship.
        </motion.p>

      </div>
    </section>
  );
}
