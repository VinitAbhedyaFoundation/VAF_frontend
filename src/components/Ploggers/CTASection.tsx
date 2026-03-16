import { ArrowRight, Users, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const VOLUNTEER_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLScrmxN2cjHbjJs8vBSqrRIyhlioUrAsiq8ufqvg7B_3G3efUg/viewform";

const CTASection = () => {
  const actions = [
    {
      icon: Users,
      title: "Join a Drive or Collaborate",
      description:
        "Walk, clean, and make a difference with our community. NGOs, groups, and individuals are all welcome.",
      buttonText: "Join a Plogging Drive",
      link: VOLUNTEER_FORM,
      external: true,
    },
    {
      icon: HandHeart,
      title: "Support the Mission",
      description:
        "Help us expand our impact. Your contribution supports community drives, equipment, and awareness programs.",
      buttonText: "Donate Now",
      link: "/donate",
      external: false,
    },
  ];

  return (
    <section
      id="join"
      className="relative scroll-mt-24 py-28 bg-gradient-to-b from-emerald-50 via-green-50 to-emerald-100 text-slate-900 overflow-hidden"
    >
      {/* organic lighting blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-300/30 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] bg-green-400/20 blur-[140px] rounded-full"></div>

      <div className="container-wide relative z-10">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-5 text-green-900">
            Be Part of the Movement
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed">
            Every step counts. Every piece of litter matters. Together we can
            create cleaner streets and stronger communities.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {actions.map((action) => (
            <div
              key={action.title}
              className="
                group
                rounded-3xl
                p-10
                text-center
                bg-white
                shadow-lg
                border border-emerald-100
                transition-all duration-300
                hover:-translate-y-2 hover:shadow-xl
              "
            >
              {/* Icon */}
              <div
                className="
                  inline-flex items-center justify-center
                  w-16 h-16 rounded-2xl mb-6
                  bg-emerald-100 text-emerald-700
                  transition-transform duration-300
                  group-hover:scale-110
                "
              >
                <action.icon className="w-7 h-7" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold mb-4 text-slate-900">
                {action.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 mb-7 leading-relaxed">
                {action.description}
              </p>

              {/* Button */}
              {action.external ? (
                <Button
                  size="lg"
                  asChild
                  className="bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-300 hover:scale-105"
                >
                  <a
                    href={action.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {action.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
              ) : (
                <Button
                  size="lg"
                  asChild
                  className="bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-300 hover:scale-105"
                >
                  <Link to={action.link}>
                    {action.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
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