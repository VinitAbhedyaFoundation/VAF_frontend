const volunteerForm = "https://forms.gle/AjoNYEgmrRgtrE5c9";
const donateBookForm = "https://docs.google.com/forms/d/e/1FAIpQLScAu744u1N4wgZy7TOaGGtvhPQM-k3OMkR9KHYbjsZEWfk-wg/viewform?usp=publish-editor";

function CTASection() {
  return (
    <section
      id="join"
      className="py-10 md:py-14 bg-[#0F2A28] text-white"
    >
      <div className="ss-container px-4">
        <div className="max-w-3xl mx-auto text-center">

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-semibold mb-5 md:mb-6 leading-tight text-[#FFF8EE]">
            Ready to join the conversation?
          </h2>

          <p className="text-sm md:text-lg mb-8 md:mb-10 max-w-xl mx-auto text-[#D1D5DB] leading-relaxed">
            There’s always room on the Shelf. Whether you want to read,
            listen, share, or simply be present — you’re welcome here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center">

            {/* Volunteer Button */}
            <a
              href={volunteerForm}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center
                         px-7 md:px-10 py-3 md:py-4 rounded-full
                         bg-[#C2410C] text-white
                         text-sm tracking-wide font-semibold
                         transition-all duration-300
                         hover:bg-[#9A3412]
                         hover:scale-[1.05]"
            >
              Join a Reading Circle
            </a>

            {/* Donate Book Button */}
            <a
              href={donateBookForm}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center
                         px-7 md:px-10 py-3 md:py-4 rounded-full
                         border border-white/40
                         text-white
                         text-sm tracking-wide font-semibold
                         transition-all duration-300
                         hover:bg-white hover:text-[#0F2A28]"
            >
              Share a Book
            </a>

          </div>

          <p className="mt-6 md:mt-8 text-[11px] md:text-xs text-white/60 tracking-wide">
            No pressure. Take your time. The Shelf is patient.
          </p>

        </div>
      </div>
    </section>
  );
}

export default CTASection;