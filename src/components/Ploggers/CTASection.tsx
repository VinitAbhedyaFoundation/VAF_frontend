import { ArrowRight, Users, HandHeart, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const VOLUNTEER_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLScrmxN2cjHbjJs8vBSqrRIyhlioUrAsiq8ufqvg7B_3G3efUg/viewform";

  const PARTNER_FORM = 
  "https://docs.google.com/forms/d/e/1FAIpQLSe4Ulcsu93URYoHu3YAwpUotzrRQMeviDdOwWWUTHc40HdgDw/viewform?usp=dialog"

const CTASection = () => {
  const actions = [
    {
      icon: Users,
      title: "Join a Drive",
      description:
        "Walk, clean, and make a difference with our community. Be part of real impact on ground.",
      buttonText: "Join a Plogging Drive",
      link: VOLUNTEER_FORM,
      external: true,
    },
    {
      icon: Handshake,
      title: "Partner With Us",
      description: "Partner with us to amplify awareness and create meaningful impact together.",
      buttonText: "Collaborate With Us",
      link: PARTNER_FORM,
      external: false,
    },
    {
      icon: HandHeart,
      title: "Support the Mission",
      description:
        "Help us expand our impact through donations for drives, equipment, and awareness programs.",
      buttonText: "Donate Now",
      link: "/donate",
      external: false,
    },
  ];

  return (
    <section
      id="join"
      className="relative scroll-mt-24 py-16 sm:py-24 bg-gradient-to-b from-emerald-50 via-green-50 to-emerald-100 overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute -top-32 -left-32 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-emerald-300/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-150px] right-[-120px] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-green-400/20 blur-[120px] rounded-full" />

      <div className="container-wide px-4 sm:px-6 relative z-10">

        {/* Heading */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-green-900 leading-tight">
            Be Part of the Movement
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed">
            Every step counts. Every action matters. Together we can create cleaner communities and stronger impact.
          </p>
        </div>

        {/* Cards — 1 col mobile, 3 col desktop */}
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 max-w-5xl mx-auto">
          {actions.map((action) => (
            <div
              key={action.title}
              className="
                group flex-1
                rounded-xl sm:rounded-3xl
                p-5 sm:p-10
                text-center
                bg-white
                shadow-sm
                border border-emerald-100
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-lg
              "
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 bg-emerald-100 text-emerald-700 transition-transform duration-300 group-hover:scale-110">
                <action.icon className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-4 text-slate-900">
                {action.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 mb-5 sm:mb-7 leading-relaxed">
                {action.description}
              </p>

              {/* Button */}
              {action.external ? (
                <Button
                  size="lg"
                  asChild
                  className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  <a
                    href={action.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    {action.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              ) : (
                <Button
                  size="lg"
                  asChild
                  className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  <Link to={action.link} className="flex items-center justify-center">
                    {action.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;