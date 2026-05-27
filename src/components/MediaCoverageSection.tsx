import { useState } from "react";
import { motion } from "framer-motion";
import {
  Newspaper,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const mediaCoverage = [
  {
    newspaper: "Saamana",
    image: "/images/VinitAbhedya/media/saamana.jpg",
  },
  {
    newspaper: "Navbharat",
    image: "/images/VinitAbhedya/media/navbharat.jpg",
  },
  {
    newspaper: "Janjagruti",
    image: "/images/VinitAbhedya/media/janjagruti.jpeg",
  },
  {
    newspaper: "Lokmat Samachar",
    image: "/images/VinitAbhedya/media/lokmat_samachar.jpeg",
  },
  {
    newspaper: "Lokmat Times",
    image: "/images/VinitAbhedya/media/lokmat_times.jpeg",
  },
  {
    newspaper: "Divya Marathi",
    image: "/images/VinitAbhedya/media/divyamarathi.jpeg",
  },
  {
    newspaper: "Navrashtra",
    image: "/images/VinitAbhedya/media/navrashtra.jpeg",
  },
];

const MediaCoverageSection = () => {
  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const nextSlide = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      (selectedIndex + 1) % mediaCoverage.length
    );
  };

  const prevSlide = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      (selectedIndex - 1 + mediaCoverage.length) %
        mediaCoverage.length
    );
  };

  return (
    <section
      className="
        relative
        py-14
        overflow-hidden
        bg-gradient-to-b
        from-[#f4fbf7]
        via-white
        to-white
      "
    >
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-emerald-100/40 rounded-full blur-[130px]" />

      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-green-100/40 rounded-full blur-[130px]" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4">

        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-emerald-100
              text-emerald-700
              text-[11px]
              font-semibold
              tracking-wide
              mb-4
            "
          >
            <Newspaper className="w-3.5 h-3.5" />
            Featured Across Leading Media Platforms
          </div>

          <h2
            className="
              text-3xl
              md:text-5xl
              font-bold
              tracking-tight
              text-slate-900
              leading-tight
            "
          >
            Recognized For
          </h2>

          <h3
            className="
              text-xl
              md:text-3xl
              font-semibold
              text-emerald-600
              mt-1
            "
          >
            Community Impact
          </h3>
        </motion.div>

        {/* SLIDER */}
        <div className="relative overflow-hidden py-5">

          {/* LEFT FADE */}
          <div className="absolute left-0 top-0 z-20 h-full w-40 bg-gradient-to-r from-[#f4fbf7] via-[#f4fbf7]/95 to-transparent pointer-events-none" />

          {/* RIGHT FADE */}
          <div className="absolute right-0 top-0 z-20 h-full w-40 bg-gradient-to-l from-[#f4fbf7] via-[#f4fbf7]/95 to-transparent pointer-events-none" />

          {/* TRACK */}
          <div
            className="
              flex
              items-center
              gap-8
              w-max
              animate-[mediaScroll_140s_linear_infinite]
              hover:[animation-play-state:paused]
            "
          >
            {[...mediaCoverage, ...mediaCoverage].map(
              (item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                  }}
                  transition={{ duration: 0.35 }}
                  onClick={() =>
                    openModal(
                      index % mediaCoverage.length
                    )
                  }
                  className="
                    relative
                    flex-shrink-0
                    w-[380px]
                    md:w-[420px]
                    h-[320px]
                    md:h-[360px]
                    overflow-hidden
                    rounded-[28px]
                    bg-white
                    border
                    border-white/40
                    shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                    hover:shadow-[0_25px_80px_rgba(0,0,0,0.16)]
                    transition-all
                    duration-700
                    cursor-pointer
                  "
                >
                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.newspaper}
                    className="
                      h-full
                      w-full
                      object-contain
                      bg-white
                      transition-transform
                      duration-1000
                      hover:scale-[1.02]
                    "
                  />

                  {/* SUBTLE OVERLAY */}
                  <div className="absolute inset-0 bg-black/[0.02]" />
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* NEWSPAPER NAME STRIP */}
        <div className="mt-10 overflow-hidden">
          <div
            className="
              flex
              items-center
              gap-20
              w-max
              animate-[logoScroll_120s_linear_infinite]
              opacity-40
            "
          >
            {[...mediaCoverage, ...mediaCoverage].map(
              (item, index) => (
                <div
                  key={index}
                  className="
                    text-sm
                    md:text-base
                    font-semibold
                    tracking-[0.22em]
                    uppercase
                    text-slate-500
                    whitespace-nowrap
                    select-none
                  "
                >
                  {item.newspaper}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">

          {/* CLOSE */}
          <button
            onClick={closeModal}
            className="
              absolute
              top-5
              right-5
              z-50
              w-12
              h-12
              rounded-full
              bg-white/10
              text-white
              flex
              items-center
              justify-center
              hover:bg-white/20
              transition
            "
          >
            <X className="w-5 h-5" />
          </button>

          {/* LEFT */}
          <button
            onClick={prevSlide}
            className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              z-50
              w-12
              h-12
              rounded-full
              bg-white/10
              text-white
              flex
              items-center
              justify-center
              hover:bg-white/20
              transition
            "
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* RIGHT */}
          <button
            onClick={nextSlide}
            className="
              absolute
              right-5
              top-1/2
              -translate-y-1/2
              z-50
              w-12
              h-12
              rounded-full
              bg-white/10
              text-white
              flex
              items-center
              justify-center
              hover:bg-white/20
              transition
            "
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* IMAGE */}
          <motion.img
            key={selectedIndex}
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.35,
            }}
            src={mediaCoverage[selectedIndex].image}
            alt=""
            className="
              max-w-full
              max-h-[94vh]
              rounded-3xl
              object-contain
              shadow-2xl
            "
          />
        </div>
      )}

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes mediaScroll {
            0% {
              transform: translateX(0%);
            }

            100% {
              transform: translateX(-50%);
            }
          }

          @keyframes logoScroll {
            0% {
              transform: translateX(0%);
            }

            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </section>
  );
};

export default MediaCoverageSection;