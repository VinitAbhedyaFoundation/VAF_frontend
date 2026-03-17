import { BookOpen, Users, MessageCircle, Heart } from "lucide-react";

const activities = [
  {
    num: "01",
    icon: BookOpen,
    tag: "Reading",
    title: "Group Reading Sessions",
    description:
      "Gather around carefully curated books that spark reflection and meaningful dialogue. We read together, slowly and intentionally.",
    cadence: "Every other Sunday",
  },
  {
    num: "02",
    icon: MessageCircle,
    tag: "Dialogue",
    title: "Open Discussions",
    description:
      "Every session invites open conversation. Share your interpretations, ask questions, and explore ideas in a judgment-free space.",
    cadence: "Post-reading, each session",
  },
  {
    num: "03",
    icon: Heart,
    tag: "Storytelling",
    title: "Storytelling Circles",
    description:
      "Beyond books, we share our own stories. Personal narratives that build bridges of empathy and lasting understanding.",
    cadence: "Monthly gathering",
  },
  {
    num: "04",
    icon: Users,
    tag: "Community",
    title: "Community Meetups",
    description:
      "Regular gatherings that strengthen our community bonds. Tea, conversation, and the warmth of genuine human connection.",
    cadence: "First Saturday monthly",
  },
];

const ActivitiesSection = () => {
  return (
    <section
      id="activities"
      className="scroll-mt-28 relative py-16 md:py-7 bg-[#F6E2CC] overflow-hidden"
    >
      {/* Soft glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-[#C2410C]/7 rounded-full blur-3xl pointer-events-none" />

      <div className="ss-container relative z-10 px-4">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-7 h-px bg-[#C2410C]/40" />
            <p className="text-[10px] font-medium tracking-[0.35em] uppercase text-[#92400E]">
              What We Do
            </p>
            <span className="w-7 h-px bg-[#C2410C]/40" />
          </div>

          <h2 className="font-display text-3xl md:text-[48px] font-normal leading-[1.18] text-[#0F172A] mb-4">
            What happens on the Shelf
          </h2>

          <p className="text-sm font-light text-[#4B5563] leading-relaxed max-w-[460px] mx-auto">
            Our gatherings are designed for depth, not speed.
            Each session creates space for reflection and genuine connection.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {activities.map((activity, i) => (
            <div
              key={i}
              className="group relative p-7 md:p-8 bg-white/50 rounded-[20px]
                         border border-white/65
                         hover:border-[#C2410C]/30 hover:bg-white/65
                         hover:-translate-y-1 hover:shadow-[0_16px_48px_-12px_rgba(194,65,12,0.12)]
                         transition-all duration-300 overflow-hidden"
            >
              {/* Ghost number */}
              <span className="absolute top-5 right-6 font-display text-[48px] font-normal leading-none
                               text-[#C2410C]/8 group-hover:text-[#C2410C]/13
                               transition-colors duration-300 select-none pointer-events-none">
                {activity.num}
              </span>

              {/* Icon */}
              <div className="relative z-10 w-[42px] h-[42px] rounded-xl flex items-center justify-center mb-5
                              bg-[#C2410C]/10 border border-[#C2410C]/20
                              group-hover:bg-[#C2410C] group-hover:border-[#C2410C]
                              transition-all duration-300">
                <activity.icon
                  className="w-[18px] h-[18px] text-[#C2410C] group-hover:text-white transition-colors duration-300"
                  strokeWidth={1.8}
                />
              </div>

              {/* Tag */}
              <span className="relative z-10 inline-block text-[10px] font-medium tracking-[0.1em] uppercase
                               text-[#92400E] bg-[#C2410C]/9 rounded-full px-[10px] py-[3px] mb-2">
                {activity.tag}
              </span>

              {/* Title */}
              <h3 className="relative z-10 font-display text-[22px] font-normal text-[#111827]
                             group-hover:text-[#C2410C] transition-colors duration-300 mb-2 leading-snug">
                {activity.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-[13.5px] font-light text-[#4B5563] leading-relaxed">
                {activity.description}
              </p>

              {/* Cadence footer */}
              <div className="relative z-10 mt-5 pt-4 border-t border-[#C2410C]/15
                              flex items-center gap-2">
                <span className="w-[6px] h-[6px] rounded-full bg-[#C2410C] opacity-50 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                <span className="text-[11px] text-[#92400E] tracking-wide">
                  {activity.cadence}
                </span>
              </div>

              {/* Bottom sweep line */}
              <span
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C2410C] group-hover:w-full rounded-b-[20px]"
                style={{ transition: "width 350ms ease" }}
              />
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
};

export default ActivitiesSection;