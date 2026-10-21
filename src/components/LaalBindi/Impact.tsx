import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const voices = [
  {
    quote:
      "For the first time, I felt like my questions weren't shameful. I learned that periods are normal, and that understanding my body is my right.",
    author: "A student from a rural school session",
    location: "Chhatrapati Sambhajinagar",
  },
  {
    quote:
      "Laal Bindi didn't just teach us about hygiene—it gave us permission to speak. Now I can talk to my daughter openly about things my mother never discussed with me.",
    author: "A mother from a community workshop",
    location: "Chhatrapati Sambhajinagar",
  },
  {
    quote:
      "When girls learn about their bodies without fear, they grow with confidence. These conversations change lives.",
    author: "A teacher from an awareness program",
    location: "Chhatrapati Sambhajinagar",
  },
];

export function Impact() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [index, setIndex] = useState(0);

  // Auto-slide through the testimonials.
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % voices.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[75vh] flex items-center justify-center px-6 md:px-12 py-20 md:py-24 bg-[#F6F3F1] overflow-hidden"
    >
      {/* Soft glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#8B3A3A]/10 blur-[140px] rounded-full" />

      <div className="relative max-w-4xl w-full text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl lg:text-6xl text-[#2B2826] mb-16"
        >
          Voices of{" "}
          <span className="italic text-[#8B3A3A]">Change</span>
        </motion.h2>

        {/* Slider */}
        <div className="relative h-[240px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <p className="text-xl md:text-2xl lg:text-3xl text-[#2B2826] leading-relaxed mb-8 italic">
                “{voices[index].quote}”
              </p>

              <div className="space-y-1">
                <p className="text-base md:text-lg text-[#736D6A]">
                  — {voices[index].author}
                </p>

                <p className="text-sm md:text-base text-[#8B3A3A] font-medium">
                  {voices[index].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mt-10">
          {voices.map((voice, i) => (
            <button
              key={voice.author}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${i === index ? "bg-[#8B3A3A]" : "bg-[#8B3A3A]/30"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}