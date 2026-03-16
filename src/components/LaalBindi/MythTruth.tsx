import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export function MythTruth() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [revealedItems, setRevealedItems] = useState<Set<number>>(new Set());

  const mythTruths = [
    {
      myth: "Menstruating women shouldn't touch plants or food",
      truth:
        "Menstruation has no negative effect on plants, food, or cooking. This is a harmful superstition rooted in stigma."
    },
    {
      myth: "Periods are impure and shameful",
      truth:
        "Menstruation is a natural, healthy biological process. There is nothing impure or shameful about it."
    },
    {
      myth: "Girls shouldn't exercise during their period",
      truth:
        "Physical activity during periods is safe and can actually help reduce cramps and improve mood."
    },
    {
      myth: "Talking about periods is inappropriate",
      truth:
        "Open conversations about menstrual health are essential for education, dignity, and breaking stigma."
    }
  ];

  const toggleReveal = (index: number) => {
    setRevealedItems((prev) => {
      const newSet = new Set(prev);
      newSet.has(index) ? newSet.delete(index) : newSet.add(index);
      return newSet;
    });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[75vh] flex items-center justify-center px-6 md:px-12 py-20 md:py-24 bg-[#2B2826] overflow-hidden"
    >
      {/* soft background glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#8B3A3A]/20 blur-[140px] rounded-full"></div>

      <div className="relative max-w-5xl w-full">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-[#FAF8F5] mb-6 text-center">
            Myth vs{" "}
            <span className="italic text-[#8B3A3A]">Truth</span>
          </h2>

          <p className="text-center text-[#E8E4DF] text-lg mb-14">
            Click on a myth to reveal the truth
          </p>
        </motion.div>

        {/* Items */}
        <div className="space-y-6">
          {mythTruths.map((item, index) => {
            const revealed = revealedItems.has(index);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => toggleReveal(index)}
                className="cursor-pointer group"
              >
                <div className="relative p-6 md:p-7 rounded-xl border border-[#FAF8F5]/15 bg-[#2B2826]/60 backdrop-blur-sm hover:border-[#8B3A3A]/40 transition-all duration-300">

                  {/* MYTH */}
                  <motion.div
                    animate={{
                      opacity: revealed ? 0.35 : 1,
                      filter: revealed ? "blur(1px)" : "blur(0px)"
                    }}
                    transition={{ duration: 0.35 }}
                  >
                    <span className="text-xs text-[#8B3A3A] uppercase tracking-[0.25em] mb-2 block">
                      Myth
                    </span>

                    <p className="text-lg md:text-xl text-[#FAF8F5] leading-relaxed">
                      {item.myth}
                    </p>
                  </motion.div>

                  {/* TRUTH */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: revealed ? 1 : 0,
                      height: revealed ? "auto" : 0,
                      marginTop: revealed ? "1.25rem" : 0
                    }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <span className="text-xs text-[#A85555] uppercase tracking-[0.25em] mb-2 block">
                      Truth
                    </span>

                    <p className="text-lg md:text-xl text-[#E8E4DF] leading-relaxed">
                      {item.truth}
                    </p>
                  </motion.div>

                  {/* Toggle icon */}
                  <div className="absolute top-6 right-6 text-[#8B3A3A] text-xl font-light transition-transform duration-300 group-hover:scale-110">
                    {revealed ? "–" : "+"}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
