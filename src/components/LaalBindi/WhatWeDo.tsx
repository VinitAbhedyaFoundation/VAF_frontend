import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, BookOpen, Heart, Users } from "lucide-react";

export function WhatWeDo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const initiatives = [
    {
      icon: MessageCircle,
      title: "Awareness Sessions",
      description:
        "Interactive conversations in schools and communities, creating safe spaces for questions and dialogue."
    },
    {
      icon: BookOpen,
      title: "Menstrual Hygiene Education",
      description:
        "Comprehensive programs covering menstrual health, hygiene practices, and body literacy."
    },
    {
      icon: Heart,
      title: "Pad Distribution Drives",
      description:
        "Ensuring access to sanitary products for those who need them, removing barriers to dignity."
    },
    {
      icon: Users,
      title: "Community Conversations",
      description:
        "Engaging families, educators, and community leaders to normalize menstrual health discussions."
    }
  ];

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 35 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 }
    }
  };

  return (
    <section
      id="what"
      ref={ref}
      className="relative min-h-[75vh] flex items-center justify-center px-6 md:px-12 py-20 md:py-24 bg-[#F6F3F1] overflow-hidden"
    >
      {/* soft atmosphere */}
      <div className="absolute -top-40 right-1/2 translate-x-1/2 w-[500px] h-[500px] bg-[#8B3A3A]/10 blur-[140px] rounded-full"></div>

      <div className="relative max-w-6xl w-full">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-[#2B2826] mb-16 leading-tight text-center">
            What We{" "}
            <span className="italic text-[#8B3A3A]">Do</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid md:grid-cols-2 gap-8"
        >
          {initiatives.map((initiative, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group p-8 md:p-10 bg-white rounded-2xl border border-[#d9d4cf] shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* icon */}
              <div className="w-12 h-12 mb-6 flex items-center justify-center text-[#8B3A3A]">
                <initiative.icon className="w-9 h-9 stroke-[1.6]" />
              </div>

              {/* title */}
              <h3 className="text-xl md:text-2xl text-[#2B2826] mb-3">
                {initiative.title}
              </h3>

              {/* description */}
              <p className="text-base md:text-lg text-[#736D6A] leading-relaxed">
                {initiative.description}
              </p>

              {/* subtle underline animation */}
              <div className="mt-6 w-10 h-[2px] bg-[#8B3A3A] transition-all duration-300 group-hover:w-16"></div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
