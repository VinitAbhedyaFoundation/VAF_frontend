import { useState } from "react";

const events = [
  "/images/TSS/event6.jpeg",
  "/images/TSS/event1.jpeg",
  "/images/TSS/event10.jpeg",
  "/images/TSS/event8.jpeg",
  "/images/TSS/event4.jpeg",
  "/images/TSS/event2.jpeg",
];

const captions = [
  "Circle Discussion",
  "Solo Reading Moment",
  "Facilitated Dialogue",
  "Community Conversation",
  "Curated Book Display",
  "Shared Reading",
];

function EventGallery() {
  const [active, setActive] = useState(null);

  const toggleCaption = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="py-10 md:py-16 bg-[#F6E2CC]">
      <div className="ss-container px-4">

        {/* Header */}
        <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
          <span className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-[#92400E] block mb-3 md:mb-4">
            Moments from the Shelf
          </span>

          <h2 className="text-2xl md:text-4xl font-display font-semibold text-[#0F172A] mb-3 md:mb-4">
            Where community happens
          </h2>

          <p className="text-sm md:text-base text-[#1F2937] leading-relaxed">
            Real moments of connection, conversation, and shared discovery from our gatherings.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {events.map((img, index) => (
            <div
              key={index}
              onClick={() => toggleCaption(index)}
              className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer"
            >
              <img
                src={img}
                alt={`Event ${index + 1}`}
                className="w-full h-56 sm:h-60 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-black/50 flex items-end transition duration-300
                ${active === index ? "opacity-100" : "opacity-0"}
                md:opacity-0 md:group-hover:opacity-100`}
              >
                <p className="text-white text-sm px-4 py-4 font-medium">
                  {captions[index]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mt-14 md:mt-24 flex justify-center">
        <div className="w-20 md:w-28 h-[2px] bg-[#C2410C]/70" />
      </div>
    </section>
  );
}

export default EventGallery;