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

const tags = [
  "Reading",
  "Reflection",
  "Dialogue",
  "Community",
  "Books",
  "Connection",
];

function EventGallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative py-16 md:py-7 bg-[#F6E2CC] overflow-hidden">

      {/* Soft glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-[#C2410C]/7 rounded-full blur-3xl pointer-events-none" />

      <div className="ss-container relative z-10 px-4">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-7 h-px bg-[#C2410C]/40" />
            <p className="text-[10px] font-medium tracking-[0.35em] uppercase text-[#92400E]">
              Moments from the Shelf
            </p>
            <span className="w-7 h-px bg-[#C2410C]/40" />
          </div>

          <h2 className="font-display text-3xl md:text-[48px] font-normal leading-[1.18] text-[#0F172A] mb-4">
            Where community happens
          </h2>

          <p className="text-sm font-light text-[#4B5563] leading-relaxed max-w-[460px] mx-auto">
            Real moments of connection, conversation, and shared discovery from our gatherings.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {events.map((img, index) => (
            <div
              key={index}
              onClick={() => setActive(active === index ? null : index)}
              className="group relative overflow-hidden rounded-[20px] cursor-pointer
                         border border-white/65 hover:border-[#C2410C]/30
                         hover:-translate-y-1 hover:shadow-[0_16px_48px_-12px_rgba(194,65,12,0.15)]
                         transition-all duration-300"
            >
              {/* Image */}
              <img
                src={img}
                alt={captions[index]}
                className="w-full h-56 sm:h-60 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient overlay — always present, intensifies on hover/active */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ opacity: active === index ? 1 : undefined }}
              />

              {/* Caption bar */}
              <div
                className="absolute bottom-0 left-0 right-0 px-5 py-4
                           translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                           transition-all duration-300"
                style={active === index ? { transform: "translateY(0)", opacity: 1 } : undefined}
              >
                {/* Tag pill */}
                <span className="inline-block text-[10px] font-medium tracking-[0.1em] uppercase
                                 text-[#F6E2CC] bg-[#C2410C]/70 rounded-full px-[10px] py-[3px] mb-2">
                  {tags[index]}
                </span>

                <p className="text-white text-sm font-light leading-snug">
                  {captions[index]}
                </p>
              </div>

              {/* Ghost index number */}
              <span className="absolute top-4 right-4 font-display text-[32px] font-normal leading-none
                               text-white/15 group-hover:text-white/25 transition-colors duration-300
                               select-none pointer-events-none">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Divider */}
      <div className="mt-7 md:mt-20 flex justify-center">
        <div className="w-20 h-px bg-[#C2410C]/40" />
      </div>
    </section>
  );
}

export default EventGallery;