import { motion } from "framer-motion";

const volunteers = [
  {
    name: "Tejaswini Gaikwad",
    image: "/images/VinitAbhedya/M4.jpeg",
    drives: 12,
    hours: 200,
  },
  {
    name: "Yash Ingle",
    image: "images/VinitAbhedya/M2.jpeg",
    drives: 8,
    hours: 150,
  },
  {
    name: "Avishkar Kamble",
    image: "images/VinitAbhedya/M3.jpeg",
    drives: 15,
    hours: 240,
  },
  {
    name: "Shruti Deshpande",
    image: "images/VinitAbhedya/M1(1).jpeg",
    drives: 10,
    hours: 180,
  },
];

const VolunteerOfMonthSection = () => {
  return (
    <section className="py-24 bg-emerald-50">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900">
            Our Volunteers
          </h2>
          <p className="text-emerald-700 mt-4 text-lg">
            Recognizing individuals driving measurable impact.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {volunteers.map((volunteer, index) => (
            <motion.div
              key={volunteer.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="
                group
                bg-white
                rounded-2xl
                p-8
                text-center
                shadow-md
                transition-all duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >
              {/* Profile Image */}
              <div className="relative w-28 h-28 mx-auto mb-6">
                <img
                  src={volunteer.image}
                  alt={volunteer.name}
                  className="w-full h-full rounded-full object-cover border-4 border-emerald-200 group-hover:border-emerald-400 transition-colors duration-300"
                />
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-emerald-900 mb-5">
                {volunteer.name}
              </h3>

              {/* Tags */}
              <div className="flex justify-center gap-3 flex-wrap">
                <span className="text-xs font-medium bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full">
                  {volunteer.drives} Drives
                </span>
                <span className="text-xs font-medium bg-emerald-200 text-emerald-900 px-4 py-1.5 rounded-full">
                  {volunteer.hours}+ Hours
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default VolunteerOfMonthSection;
