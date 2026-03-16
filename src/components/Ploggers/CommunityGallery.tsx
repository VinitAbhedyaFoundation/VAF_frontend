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
      className="relative scroll-mt-24 py-28 bg-gradient-to-b from-white via-emerald-50/30 to-white overflow-hidden"
    >
      <div className="container-wide">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[11px] font-medium tracking-widest uppercase text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Real People · Real Impact
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl text-green-900 mb-4 tracking-tight leading-[1.1]">
            Community{" "}
            <em className="not-italic text-emerald-600">in Action</em>
          </h2>

          <div className="w-12 h-0.5 bg-emerald-500 mx-auto mb-6 rounded-full" />

          <p className="text-lg text-slate-500 leading-relaxed">
            The real heroes are the people who show up, week after week,
            to make our city a little bit better.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-3 gap-4">

          {/* BIG IMAGE */}
          <div className="md:col-span-2 md:row-span-2 group relative rounded-2xl overflow-hidden min-h-[340px]">
            <img
              src={images[0].src}
              alt={images[0].caption}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

            {/* Caption chip */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5">
                <p className="text-xs text-white/60 uppercase tracking-widest mb-0.5">Featured</p>
                <p className="text-sm font-medium text-white">{images[0].caption}</p>
              </div>
            </div>
          </div>

          {/* SMALL IMAGES */}
          {images.slice(1).map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square rounded-2xl overflow-hidden"
            >
              <img
                src={image.src}
                alt={image.caption}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Always-visible subtle bottom fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Caption — slides up on hover */}
              <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-sm text-white leading-snug">{image.caption}</p>
              </div>
            </div>
          ))}

          {/* GALLERY CTA TILE */}
          
           <a href="/gallery"
            className="group relative aspect-square rounded-2xl overflow-hidden"
          >
            <img
              src={communityImage6}
              alt="View full gallery"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-emerald-950/70 group-hover:bg-emerald-950/80 transition-colors duration-300" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
              {/* Icon circle */}
              <div className="w-12 h-12 rounded-full border border-white/25 bg-white/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-colors duration-300">
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>

              <h3 className="font-serif text-xl mb-1.5">View Full Gallery</h3>
              <p className="text-sm text-white/65 leading-relaxed">
                Explore more moments from our drives
              </p>

              <div className="mt-5 text-[10px] uppercase tracking-[.15em] text-white/50 group-hover:text-emerald-300 transition-colors duration-300">
                Open Gallery
              </div>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
};

export default CommunityGallery;