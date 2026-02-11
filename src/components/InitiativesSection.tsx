import { motion } from "framer-motion";
import { ExternalLink, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

import ploggersImg from "@/assets/ploggers.jpg";
import socialShelfImg from "@/assets/social-shelf.jpg";
import laalBindiImg from "@/assets/laal-bindi.jpg";

/* -------------------- TYPES -------------------- */

type Initiative = {
  title: string;
  description: string;
  image: string;
  tag: string;
  badge: string;
  hover: string;
};

/* -------------------- DATA -------------------- */

const initiatives: Initiative[] = [
  {
    title: "Sambhajinagar Ploggers",
    description:
      "Combining fitness with environmental cleanup, Sambhajinagar Ploggers brings together citizens who jog through city streets while collecting waste, transforming daily exercise into meaningful climate action.",
    image: ploggersImg,
    tag: "Environment",
    badge: "bg-emerald-600",
    hover: "hover:bg-emerald-600 hover:text-white hover:border-emerald-600",
  },
  {
    title: "Social Shelf",
    description:
      "Social Shelf is a community-driven book-sharing initiative that creates open access to knowledge. By encouraging people to donate, exchange, and read books freely, it nurtures learning, conversation, and connection across neighborhoods.",
    image: socialShelfImg,
    tag: "Education",
    // 🔑 logo-inspired color ONLY here
    badge: "bg-[#E8A857]",
    hover: "hover:bg-[#E8A857] hover:text-white hover:border-[#E8A857]",
  },
  {
    title: "Laal Bindi",
    description:
      "Laal Bindi is a women’s empowerment campaign that uses the red bindi as a symbol of strength, dignity, and identity. The initiative raises awareness around gender equality, safety, and women’s rights through dialogue and community action.",
    image: laalBindiImg,
    tag: "Women Empowerment",
    badge: "bg-rose-600",
    hover: "hover:bg-rose-600 hover:text-white hover:border-rose-600",
  },
];

/* -------------------- COMPONENT -------------------- */

const InitiativesSection: React.FC = () => {
  return (
    <section
      id="initiatives"
      className="relative pt-24 pb-32 bg-gradient-to-b from-emerald-50 via-white to-emerald-100"
    >
      {/* subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_60%)] pointer-events-none" />

      <div className="relative container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-28"
        >
          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white shadow-sm text-sm font-semibold text-emerald-700 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Our Initiatives
          </span>
        </motion.div>

        {/* CONTINUOUS INITIATIVES FLOW */}
        <div className="flex flex-col gap-36">
          {initiatives.map((item, index) => {
            const imageLeft = index % 2 === 0;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-2 items-center gap-20"
              >
                {/* IMAGE */}
                <div
                  className={`${
                    imageLeft ? "md:order-1" : "md:order-2"
                  } h-80 md:h-[440px]`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>

                {/* CONTENT */}
                <div
                  className={`${
                    imageLeft ? "md:order-2" : "md:order-1"
                  }`}
                >
                  {/* CATEGORY PILL */}
                  <span
                    className={`inline-block px-6 py-2 rounded-full text-sm font-semibold text-white ${item.badge} mb-6`}
                  >
                    {item.tag}
                  </span>

                  <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-slate-700 text-lg leading-relaxed mb-5">
                    {item.description}
                  </p>

                  <p className="text-slate-600 text-base leading-relaxed mb-10">
                    Through consistent on-ground efforts, community participation,
                    and awareness-building activities, this initiative focuses on
                    long-term social impact and collective responsibility.
                  </p>

                  {/* LEARN MORE BUTTON */}
                  <Button
                    variant="outline"
                    size="lg"
                    className={`rounded-full px-10 transition-all duration-300 ${item.hover}`}
                  >
                    Learn More <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        {/* Elegant Center Divider */}

      <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="relative mt-24 max-w-4xl mx-auto bg-white/60 backdrop-blur-md rounded-3xl p-14 shadow-xl border border-white/40 text-center"
>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Be Part of the Change
          </h3>

          <p className="text-muted-foreground mb-14 leading-relaxed text-lg">
            Whether you want to volunteer on the ground or collaborate as an
            organization, there’s a meaningful role for you in our journey
            toward a more inclusive and responsible society.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button className="rounded-full px-12 h-14 text-lg gap-2 shadow-lg">
              🙌 Join as Volunteer
            </Button>

            <Button
              variant="outline"
              className="rounded-full px-12 h-14 text-lg gap-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white"
            >
              <Heart className="w-5 h-5" />
              Be a Partner
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InitiativesSection;