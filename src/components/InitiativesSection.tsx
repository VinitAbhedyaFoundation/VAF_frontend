import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  ExternalLink,
  Sparkles,
  HandHeart,
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ploggersImg = "/images/VinitAbhedya/ploggers.jpeg";
const ploggers2Img = "/images/VinitAbhedya/ploggers3.jpeg";
const socialShelfImg = "/images/VinitAbhedya/social-shelf.jpeg";
const bookImg = "/images/VinitAbhedya/books.jpeg";
const laalBindiImg = "/images/VinitAbhedya/laal-bindi.jpeg";
const laalBindi2Img = "/images/VinitAbhedya/laal-bindi2.jpeg";

const VOLUNTEER_FORM = "https://docs.google.com/forms/d/e/1FAIpQLScrmxN2cjHbjJs8vBSqrRIyhlioUrAsiq8ufqvg7B_3G3efUg/viewform?usp=publish-editor";
const PARTNERSHIP_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSe4Ulcsu93URYoHu3YAwpUotzrRQMeviDdOwWWUTHc40HdgDw/viewform?usp=dialog";

const initiatives = [
  {
    title: "Sambhajinagar Ploggers",
    description:
      "Combining fitness with environmental cleanup, Sambhajinagan Ploggers brings together citizens who jog through city streets while collecting waste.",
    images: [ploggersImg, ploggers2Img],
    tag: "Environment",
    badge: "bg-emerald-600",
    accentColor: "#059669",
    link: "/ploggers",
  },
  {
    title: "Social Shelf",
    description:
      "A community-driven book-sharing initiative creating open access to knowledge across neighborhoods.",
    images: [bookImg, socialShelfImg],
    tag: "Education",
    badge: "bg-[#E8A857]",
    accentColor: "#E8A857",
    link: "/social-shelf",
  },
  {
    title: "Laal Bindi",
    description:
      "A women's empowerment campaign using the red bindi as a symbol of strength, dignity, and identity.",
    images: [laalBindi2Img, laalBindiImg],
    tag: "Women Empowerment",
    badge: "bg-rose-600",
    accentColor: "#e11d48",
    link: "/laal-bindi",
  },
];

const InitiativesSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const autoplayRef = useRef(null);
  const isTransitioning = useRef(false);

  const currentInitiative = initiatives[current];

  // Navigate between initiatives
  const paginate = useCallback((newDirection) => {
    if (isTransitioning.current) return;

    isTransitioning.current = true;
    setDirection(newDirection);

    setCurrent(
      (prev) => (prev + newDirection + initiatives.length) % initiatives.length
    );

    setTimeout(() => {
      isTransitioning.current = false;
    }, 800);
  }, []);

  // Initiative auto-rotation (every 5 seconds)
  useEffect(() => {
    autoplayRef.current = setInterval(() => paginate(1), 8000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [paginate]);

  // Keyboard navigation removed - auto-slide only

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: {
          type: "spring" as const,
          stiffness: 200,
          damping: 30,
          mass: 0.8,
        },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: {
          type: "spring" as const,
          stiffness: 200,
          damping: 30,
          mass: 0.8,
        },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    }),
  };

  const PhotoFrame = ({ delay, rotate, position, size, zIndex, imageIndexOffset = 0 }) => {
    // Show static image based on offset
    const displayImageIndex = imageIndexOffset % currentInitiative.images.length;

    return (
      <motion.div
        initial={{ opacity: 0, rotate: rotate * 2, y: 30 }}
        animate={{ opacity: 1, rotate, y: 0 }}
        transition={{
          delay,
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          rotate: rotate / 2,
          scale: 1.02,
          y: -8,
          zIndex: 40,
        }}
        className={`absolute ${position} ${size} ${zIndex} cursor-pointer group`}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20">
          <div
            className={`relative ${
              size === "w-[52%]" ? "aspect-[4/3]" : "aspect-[3/4]"
            } overflow-hidden bg-slate-100`}
          >
            <img
              src={currentInitiative.images[displayImageIndex]}
              alt={`${currentInitiative.title} - Image ${displayImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      {/* Initiatives Carousel Section */}
      <section
        id="initiatives"
        className="relative pt-32 pb-16 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, ${currentInitiative.accentColor}08 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, ${currentInitiative.accentColor}05 0%, transparent 50%)
          `,
        }}
        aria-label="Our Initiatives"
      >
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] pointer-events-none" />

        <div className="relative container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg border border-white/60 text-sm font-bold text-slate-700 uppercase tracking-[0.15em]"
            >
              <Sparkles className="w-5 h-5 text-amber-500" />
              Our Initiatives
            </motion.div>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Left Button */}
            <button
              onClick={() => paginate(-1)}
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-40 bg-white shadow-lg p-3 rounded-full"
            >
              <ChevronLeft className="w-5 h-5 text-slate-800" />
            </button>

            {/* Right Button */}
            <button
              onClick={() => paginate(1)}
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-40 bg-white shadow-lg p-3 rounded-full"
            >
              <ChevronRight className="w-5 h-5 text-slate-800" />
            </button>

            <div
              className="relative overflow-hidden rounded-3xl"
              role="region"
              aria-label="Initiatives carousel"
              aria-live="polite"
            >
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative w-full"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 p-8 lg:p-12 items-center min-h-[600px]">
                    {/* Photo Collage */}
                    <motion.div
                      className="relative order-2 lg:order-1 h-[520px] lg:h-[620px]"
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <div
                        className="absolute inset-0 rounded-3xl opacity-5"
                        style={{
                          background: `radial-gradient(circle at 30% 40%, ${currentInitiative.accentColor} 0%, transparent 70%)`,
                        }}
                        aria-hidden="true"
                      />

                      <PhotoFrame
                        delay={0.3}
                        rotate={-4}
                        position="left-[2%] top-[5%]"
                        size="w-[52%]"
                        zIndex="z-10"
                        imageIndexOffset={0}
                      />

                      <PhotoFrame
                        delay={0.5}
                        rotate={3}
                        position="right-[5%] top-[25%]"
                        size="w-[62%]"
                        zIndex="z-20"
                        imageIndexOffset={1}
                      />

                      <motion.div
                        initial={{ opacity: 0, scale: 0.7, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
                        className="absolute -top-4 left-1/2 -translate-x-1/2 z-30"
                      >
                        <div
                          className={`${currentInitiative.badge} text-white px-8 py-3.5 rounded-full shadow-2xl font-bold text-sm tracking-wide backdrop-blur-sm`}
                          style={{
                            boxShadow: `0 10px 30px ${currentInitiative.accentColor}50, 0 4px 10px rgba(0,0,0,0.15)`,
                          }}
                        >
                          {currentInitiative.tag}
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      className="space-y-8 order-1 lg:order-2"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <div className="space-y-4">
                        <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-[0.95] tracking-tight">
                          {currentInitiative.title.split(" ").map((word, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                              className="block"
                            >
                              {word}
                            </motion.span>
                          ))}
                        </h2>
                      </div>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="text-slate-600 text-lg lg:text-xl leading-relaxed max-w-xl"
                      >
                        {currentInitiative.description}
                      </motion.p>

                      {/* CTA Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                      >
                        <Button
                          asChild
                          size="lg"
                          className="group relative overflow-hidden bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 rounded-full text-base font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
                          style={{
                            boxShadow: `0 10px 40px ${currentInitiative.accentColor}30`,
                          }}
                        >
                          <a href={currentInitiative.link}>
                            <span className="relative z-10 flex items-center gap-2">
                              Learn More
                              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </span>
                            <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                background: `linear-gradient(135deg, ${currentInitiative.accentColor}20, transparent)`,
                              }}
                            />
                          </a>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Screen Reader Announcement */}
            <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
              Showing initiative {current + 1} of {initiatives.length}: {currentInitiative.title}
            </div>

            {/* Dots Indicator */}
            <div className="flex items-center justify-center gap-3 mt-8">
              {initiatives.map((_, index) => (
                <div
                  key={index}
                  className={`rounded-full transition-all duration-300 ${
                    index === current ? "w-8 h-2" : "w-2 h-2"
                  }`}
                  style={{
                    backgroundColor: index === current ? currentInitiative.accentColor : "#cbd5e1",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Soft Green Ombre Background */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Multi-layer gradient background for soft ombre effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/60 via-teal-50/40 to-green-100/50" />
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/30 via-transparent to-teal-100/40" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-green-50/20 to-emerald-100/30" />

        {/* Subtle radial glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 max-w-5xl">
          {/* Clean white box with subtle elevation */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-lg border border-emerald-100/50">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-12"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900"
              >
                Be Part of the Change
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
              >
                Whether you want to volunteer on the ground or collaborate as an organization, there's a
                meaningful role for you in our journey toward a more inclusive and responsible society.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
              >
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 rounded-xl font-semibold shadow-lg min-w-[220px]"
                  >
                    <a href={VOLUNTEER_FORM} target="_blank" rel="noopener noreferrer">
                      <HandHeart className="w-5 h-5 mr-2" />
                      Join as Volunteer
                    </a>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="bg-white border-slate-300 text-slate-700 px-8 py-6 rounded-xl font-semibold shadow-md min-w-[220px]"
                  >
                    <a href={PARTNERSHIP_FORM} target="_blank" rel="noopener noreferrer">
                      <Handshake className="w-5 h-5 mr-2" />
                      Be a Partner
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InitiativesSection;