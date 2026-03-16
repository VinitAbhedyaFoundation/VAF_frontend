import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ImageWithFallback } from "./ImageWithFallback";

const img1 = "/images/Laalbindi/event5.jpeg";
const img2 = "/images/Laalbindi/event3.jpeg";
const img3 = "/images/Laalbindi/event2.jpeg";
const img4 = "/images/Laalbindi/event1.jpeg";
const img5 = "/images/Laalbindi/event6.jpeg";
const img6 = "/images/Laalbindi/event4.jpeg";

export function EventGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const eventPhotos = [
    { src: img1, caption: "Partner School Where Awareness Sessions Are Conducted" },
    { src: img2, caption: "Menstrual Health Awareness Session in Classroom" },
    { src: img3, caption: "Interactive Learning and Open Conversations" },
    { src: img4, caption: "Team and Students Celebrating the Awareness Drive" },
    { src: img5, caption: "Students Engaging and Participating During the Session" },
    { src: img6, caption: "Laal Bindi Team at the School Campus" }
  ];

  return (
    <>
      <section
        ref={ref}
        className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-20 md:py-24 bg-[#E8E4DF] overflow-hidden"
      >
        {/* background glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#8B3A3A]/10 blur-[140px] rounded-full"></div>

        <div className="relative max-w-6xl w-full">

          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl text-[#2B2826] mb-5">
              Moments of{" "}
              <span className="italic text-[#8B3A3A]">Impact</span>
            </h2>

            <p className="text-lg md:text-xl text-[#736D6A] max-w-xl mx-auto">
              Glimpses from our awareness sessions and community workshops.
            </p>
          </motion.div>

          {/* gallery grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventPhotos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 35 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                onClick={() => setSelectedImage(index)}
                className="group cursor-pointer relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.35 }}
                >
                  <ImageWithFallback
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-[260px] object-cover"
                  />

                  {/* hover caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                    <p className="text-white text-lg leading-snug">
                      {photo.caption}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* footer text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-center mt-10"
          >
            <p className="text-sm text-[#736D6A] italic">
              Every image tells a story of courage and collective strength.
            </p>
          </motion.div>

        </div>
      </section>

      {/* lightbox */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full"
          >
            <ImageWithFallback
              src={eventPhotos[selectedImage].src}
              alt={eventPhotos[selectedImage].caption}
              className="w-full max-h-[85vh] object-contain rounded-lg"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <p className="text-white text-xl">
                {eventPhotos[selectedImage].caption}
              </p>
            </div>

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white text-xl transition"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
