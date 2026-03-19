import { ArrowRight } from "lucide-react";

const communityImage1 = "/images/Ploggers/community1.jpeg";
const communityImage2 = "/images/Ploggers/community2.jpeg";
const communityImage3 = "/images/Ploggers/community3.jpeg";
const communityImage4 = "/images/Ploggers/community4.jpeg";
const communityImage5 = "/images/Ploggers/community6.jpeg";
const communityImage6 = "/images/Ploggers/community5.jpeg";

const CommunityGallery = () => {
  const images = [
    { src: communityImage1, caption: "Bowl painting activity on weekend" },
    { src: communityImage4, caption: "Volunteers collecting litter during drive" },
    { src: communityImage2, caption: "Bowl painting activity on weekend" },
    { src: communityImage3, caption: "Volunteers collecting litter during drive" },
    { src: communityImage5, caption: "Community members working together" },
  ];

  return (
    <section
      id="community"
      className="relative scroll-mt-24 py-16 sm:py-28 bg-gradient-to-b from-white via-emerald-50/30 to-white overflow-hidden"
    >
      <div className="container-wide px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-medium tracking-widest uppercase text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full mb-4 sm:mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Real People · Real Impact
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-green-900 mb-3 sm:mb-4 leading-tight">
            Community{" "}
            <span className="text-emerald-600">in Action</span>
          </h2>

          <div className="w-10 sm:w-12 h-0.5 bg-emerald-500 mx-auto mb-4 sm:mb-6 rounded-full" />

          <p className="text-sm sm:text-lg text-slate-500 leading-relaxed">
            The real heroes are the people who show up, week after week.
          </p>
        </div>

        {/* MOBILE FIRST LAYOUT */}
        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-3 sm:gap-4">

          {/* Featured Image */}
          <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] sm:col-span-2 sm:row-span-2">
            <img
              src={images[0].src}
              alt={images[0].caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Always visible caption (mobile fix) */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/40 backdrop-blur-md rounded-lg px-3 py-2">
                <p className="text-[10px] text-white/60 uppercase mb-1">Featured</p>
                <p className="text-sm text-white">{images[0].caption}</p>
              </div>
            </div>
          </div>

          {/* Small Images */}
          {images.slice(1).map((image, index) => (
            <div
              key={index}
              className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-square"
            >
              <img
                src={image.src}
                alt={image.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* ALWAYS visible caption (fix for mobile) */}
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-xs text-white leading-snug">
                  {image.caption}
                </p>
              </div>
            </div>
          ))}

          {/* CTA TILE */}
          <a
            href="/gallery"
            className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-square"
          >
            <img
              src={communityImage6}
              alt="View full gallery"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-emerald-950/70" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/25 bg-white/10 flex items-center justify-center mb-3">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              <h3 className="text-base sm:text-xl font-serif mb-1">
                View Gallery
              </h3>

              <p className="text-xs sm:text-sm text-white/70">
                Explore more moments
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CommunityGallery;