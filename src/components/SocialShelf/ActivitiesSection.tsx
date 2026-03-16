import { BookOpen, Users, MessageCircle, Heart } from "lucide-react";

const activities = [
  {
    icon: BookOpen,
    title: "Group Reading Sessions",
    description:
      "Gather around carefully curated books that spark reflection and meaningful dialogue. We read together, slowly and intentionally.",
  },
  {
    icon: MessageCircle,
    title: "Open Discussions",
    description:
      "Every session invites open conversation. Share your interpretations, ask questions, and explore ideas in a judgment-free space.",
  },
  {
    icon: Heart,
    title: "Storytelling Circles",
    description:
      "Beyond books, we share our own stories. Personal narratives that build bridges of empathy and understanding.",
  },
  {
    icon: Users,
    title: "Community Meetups",
    description:
      "Regular gatherings that strengthen our community bonds. Tea, conversation, and the warmth of genuine human connection.",
  },
];

const ActivitiesSection = () => {
  return (
    <section
      id="activities"
      className="scroll-mt-28 relative pt-7 pb-7 bg-[#F6E2CC]"
    >

      {/* Soft Decorative Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#C2410C]/5 rounded-full blur-3xl" />
      </div>

      <div className="ss-container relative z-10">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#92400E] mb-3">
            WHAT WE DO
          </p>

          <h2 className="text-3xl md:text-4xl font-display font-semibold text-[#0F172A] mb-4">
            What happens on the Shelf
          </h2>

          <p className="text-base text-[#1F2937] leading-relaxed">
            Our gatherings are designed for depth, not speed.
            Each session creates space for reflection and genuine connection.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {activities.map((activity, index) => (
            <div
              key={index}
              className="group relative p-7 bg-white rounded-xl
                         border border-[#E5D3B3]
                         transition-all duration-300
                         hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-full flex items-center justify-center mb-5
                              bg-[#C2410C]/10 text-[#C2410C]
                              transition-all duration-300
                              group-hover:bg-[#C2410C]
                              group-hover:text-white">
                <activity.icon className="w-5 h-5" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-[#111827] mb-3 transition-colors duration-300 group-hover:text-[#C2410C]">
                {activity.title}
              </h3>

              {/* Description */}
              <p className="text-[#374151] text-sm leading-relaxed">
                {activity.description}
              </p>

              {/* Accent Line */}
              <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#C2410C] transition-all duration-300 group-hover:w-full rounded-b-xl" />
            </div>
          ))}

        </div>

      </div>

      {/* Divider */}
      <div className="mt-20 flex justify-center">
        <div className="w-28 h-[2px] bg-[#C2410C]/70" />
      </div>

    </section>
  );
};

export default ActivitiesSection;