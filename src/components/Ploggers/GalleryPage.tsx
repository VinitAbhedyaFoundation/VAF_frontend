import { useState } from "react";

const sections = [
  {
    id: "shivjayanti",
    title: "Shivjayanti Drive",
    description:
      "Celebrating Chhatrapati Shivaji Maharaj's legacy by keeping his city clean.",
    images: [
      "/images/Ploggers/community5.jpeg",
      "/images/Ploggers/shivjayanti3.jpeg",      
      "/images/Ploggers/shivjayanti1.jpeg",
      "/images/Ploggers/shivjayanti4.jpeg",
    ],
  },
  {
    id: "painting",
    title: "Painting Activities",
    description:
      "Bringing colour and creativity to public spaces through community art.",
    images: [
      "/images/Ploggers/paint1.jpeg",
      "/images/Ploggers/paint2.jpeg",
      "/images/Ploggers/paint3.jpeg",
      "/images/Ploggers/paint4.jpeg",

    ],
  },
  {
    id: "chalk-of-shame",
    title: "Chalk of Shame",
    description:
      "A powerful awareness activity that challenges how we treat our public spaces.",
    images: [
      "/images/Ploggers/cos3.jpeg",
      "/images/Ploggers/cos1.jpeg",
      "/images/Ploggers/cos4.jpeg",
      "/images/Ploggers/cos2.jpeg",

    ],
  },
  {
    id: "litter-collecting",
    title: "Litter Collecting Drives",
    description:
      "Week after week, our volunteers hit the streets to pick up what others leave behind.",
    images: [
      
      "/images/Ploggers/litter1.jpeg",
      "/images/Ploggers/litter4.jpeg",
      "/images/Ploggers/litter2.jpeg",
      "/images/Ploggers/litter5.jpeg",
    ],
  },
  {
    id: "tree-plantation",
    title: "Tree Plantation",
    description:
      "Planting roots — literally — for a greener Chh. Sambhajinagar.",
    images: [
      "/images/Ploggers/tree1.jpeg",
      "/images/Ploggers/tree2.jpeg",
      "/images/Ploggers/tree4.jpeg",
      "/images/Ploggers/tree3.jpeg",

    ],
  },
];

const Lightbox = ({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => (
  <div
    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
    onClick={onClose}
  >
    <button
      onClick={(e) => {
        e.stopPropagation();
        onPrev();
      }}
      className="absolute left-4 sm:left-8 text-white/60 hover:text-white transition text-3xl"
    >
      ‹
    </button>

    <img
      src={images[index]}
      alt=""
      onClick={(e) => e.stopPropagation()}
      className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
    />

    <button
      onClick={(e) => {
        e.stopPropagation();
        onNext();
      }}
      className="absolute right-4 sm:right-8 text-white/60 hover:text-white transition text-3xl"
    >
      ›
    </button>

    <button
      onClick={onClose}
      className="absolute top-5 right-5 text-white/50 hover:text-white transition text-xl"
    >
      ✕
    </button>

    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest uppercase">
      {index + 1} / {images.length}
    </div>
  </div>
);

const GalleryPage = () => {
  const [lightbox, setLightbox] = useState<{
    sectionIdx: number;
    imageIdx: number;
  } | null>(null);

  const openLightbox = (sectionIdx: number, imageIdx: number) =>
    setLightbox({ sectionIdx, imageIdx });

  const closeLightbox = () => setLightbox(null);

  const currentImages =
    lightbox !== null ? sections[lightbox.sectionIdx].images : [];

  const goPrev = () => {
    if (!lightbox) return;
    setLightbox({
      ...lightbox,
      imageIdx:
        (lightbox.imageIdx - 1 + currentImages.length) % currentImages.length,
    });
  };

  const goNext = () => {
    if (!lightbox) return;
    setLightbox({
      ...lightbox,
      imageIdx: (lightbox.imageIdx + 1) % currentImages.length,
    });
  };

  return (
    <>
      {lightbox !== null && (
        <Lightbox
          images={currentImages}
          index={lightbox.imageIdx}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}

      <div className="min-h-screen bg-white">

        {/* Header */}
        <div className="py-20 sm:py-28 text-center bg-gradient-to-b from-emerald-50/60 to-white border-b border-emerald-100/60">
          <div className="inline-flex items-center gap-2 text-[11px] font-medium tracking-widest uppercase text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Chh. Sambhajinagar Ploggers
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl text-green-900 mb-4 tracking-tight leading-[1.1]">
            Community <em className="not-italic text-emerald-600">Gallery</em>
          </h1>

          <div className="w-12 h-0.5 bg-emerald-500 mx-auto mb-5 rounded-full" />

          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed px-4">
            Moments from our plogging drives, awareness activities,
            and community initiatives.
          </p>

          {/* Jump Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 px-4">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-xs font-medium tracking-wide text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-full transition-colors duration-200"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* Gallery Sections */}
        <div className="container-wide py-20 space-y-24">
          {sections.map((section, sectionIdx) => (
            <div key={section.id} id={section.id} className="scroll-mt-24">

              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
                <div>
                  <p className="text-[10px] font-medium tracking-[.15em] uppercase text-emerald-500 mb-1">
                    {String(sectionIdx + 1).padStart(2, "0")}
                  </p>

                  <h2 className="font-serif text-2xl sm:text-3xl text-green-900">
                    {section.title}
                  </h2>
                </div>

                <p className="text-sm text-slate-500 sm:max-w-xs sm:text-right">
                  {section.description}
                </p>
              </div>

              <div className="w-full h-px bg-emerald-100 mb-8" />

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {section.images.map((img, imageIdx) => (
                  <button
                    key={imageIdx}
                    onClick={() => openLightbox(sectionIdx, imageIdx)}
                    className="group relative aspect-square rounded-2xl overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`${section.title} ${imageIdx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                        +
                      </div>
                    </div>
                  </button>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default GalleryPage;