import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Users, Heart } from "lucide-react";

const VOLUNTEER_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLScrmxN2cjHbjJs8vBSqrRIyhlioUrAsiq8ufqvg7B_3G3efUg/viewform";

const SESSION_FORM =
"https://docs.google.com/forms/d/1CdjS6LotlErRAV_2qHIkEv1nrriqyAQlcohxuXeSYhw/edit"
export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const actions = [
    {
      icon: Users,
      title: "Become a Volunteer",
      description:
        "Join the Laal Bindi movement and help us spread menstrual awareness in communities.",
      link: VOLUNTEER_FORM
    },
    {
      icon: Mail,
      title: "Invite a School Session",
      description:
        "Bring Laal Bindi awareness sessions to your school, college, or organization.",
      link: SESSION_FORM
    },
    {
      icon: Heart,
      title: "Support the Movement",
      description:
        "Help us expand our reach and empower more communities through education.",
      link: "/donate"
    }
  ];

  return (
    <section
      id="involved"
      ref={ref}
      className="relative min-h-[75vh] flex items-center justify-center px-6 md:px-12 py-20"
    >
      <div className="max-w-6xl w-full">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-[#2B2826] mb-6">
            Join the{" "}
            <span className="italic text-[#8B3A3A]">Movement</span>
          </h2>

          <p className="text-lg md:text-xl text-[#736D6A] max-w-xl mx-auto leading-relaxed">
            Every conversation matters. Every action counts. Together we can
            build a world where menstruation is met with understanding, not stigma.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {actions.map((action, index) => (
            <motion.a
              key={index}
              href={action.link}
              target={action.link.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.08 }}
              whileHover={{ y: -4 }}
              className="group p-7 md:p-8 border-2 border-[#2B2826]/80 hover:bg-[#2B2826] transition-all duration-300 text-center block rounded-lg"
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.25 }}
                className="w-12 h-12 mx-auto mb-5 flex items-center justify-center"
              >
                <action.icon className="w-9 h-9 text-[#8B3A3A] group-hover:text-[#A85555] stroke-[1.5]" />
              </motion.div>

              <h3 className="text-xl text-[#2B2826] group-hover:text-[#FAF8F5] mb-3">
                {action.title}
              </h3>

              <p className="text-sm text-[#736D6A] group-hover:text-[#E8E4DF] leading-relaxed">
                {action.description}
              </p>
            </motion.a>
          ))}
        </div>

        {/* contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-[#736D6A] text-sm md:text-base mb-4">
            For inquiries, partnerships, or more information
          </p>

          <a
            href="mailto:contact@vinitabhedyafoundation.org"
            className="text-[#8B3A3A] hover:text-[#A85555] text-base md:text-lg transition-colors duration-300 underline underline-offset-4"
          >
            admin@vinitabhedyafoundation.com
              </a>
        </motion.div>

      </div>
    </section>
  );
}
