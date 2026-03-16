import { ArrowRight, Users, Calendar, Footprints } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const actions = [
    {
      icon: Calendar,
      title: "Join a Plogging Drive",
      description: "Participate in our next community drive",
      buttonText: "Find Upcoming Drives",
    },
    {
      icon: Users,
      title: "Volunteer With Us",
      description: "Help organize and lead community activities",
      buttonText: "Become a Volunteer",
    },
    {
      icon: Footprints,
      title: "Walk With Us",
      description: "Start small — just show up and walk",
      buttonText: "Get Started",
    },
  ];

  return (
    <section
      id="join"
      className="scroll-mt-24 section-padding bg-gradient-to-br from-emerald-900 via-emerald-700 to-emerald-400 text-white relative overflow-hidden"
    >
      <div className="container-wide relative z-10">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Join the Movement
          </h2>

          <p className="text-lg opacity-90">
            Every step counts. Every piece of litter matters.
            Be part of something that makes a real difference.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {actions.map((action) => (
            <div
              key={action.title}
              className="
                rounded-2xl p-8 text-center
                bg-white text-foreground
                shadow-xl
                transition-all duration-300
                hover:-translate-y-4 hover:shadow-2xl hover:scale-105
              "
            >
              {/* Icon */}
              <div
                className="
                  inline-flex items-center justify-center
                  w-14 h-14 rounded-xl mb-6
                  bg-primary/10 text-primary
                  transition-transform duration-300
                  hover:scale-110
                "
              >
                <action.icon className="w-6 h-6" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {action.title}
              </h3>

              {/* Description */}
              <p className="text-sm mb-6 text-muted-foreground">
                {action.description}
              </p>

              {/* Button */}
              <Button
                size="sm"
                className="
                  group
                  bg-primary text-white
                  transition-all duration-300
                  hover:scale-105 hover:shadow-lg
                "
              >
                {action.buttonText}

                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;