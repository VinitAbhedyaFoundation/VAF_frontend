
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import API from "@/api/api";

interface Volunteer {
  rank: number;
  name: string;
  totalHours: number;
  totalDrives: number;
  drives: {
    id: number;
    title: string | null;
    date: string;
    initiative: string | null;
    location: string | null;
    hours: number;
  }[];
}

interface HomepageVolunteerResponse {
  message: string;
  volunteers: Volunteer[];
}

const VolunteerOfMonthSection = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        setLoading(true);
        setError(false);

        const response =
          await API.get<HomepageVolunteerResponse>(
            "/user/homepage-volunteers"
          );

        setVolunteers(response.data.volunteers ?? []);
      } catch (err) {
        console.error("Failed to fetch homepage volunteers:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  const scrollSlider = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const getInitials = (name: string) => {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  };

  return (
    <section className="py-24 bg-emerald-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900">
            Our Volunteers
          </h2>

          <p className="text-emerald-700 mt-4 text-lg">
            Recognizing individuals driving measurable impact.
          </p>
        </motion.div>

        {loading && (
          <div className="text-center py-16 text-emerald-800">
            Loading our volunteers...
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-red-600">
              Unable to load volunteer information.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-emerald-800 font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && volunteers.length === 0 && (
          <div className="text-center py-16 text-emerald-800">
            Volunteer contributions will appear here soon.
          </div>
        )}

        {!loading && !error && volunteers.length > 0 && (
          <>
            <div className="flex justify-end gap-3 mb-6">
              <button
                onClick={() => scrollSlider("left")}
                aria-label="Previous volunteers"
                className="p-3 rounded-full bg-white text-emerald-900 shadow hover:bg-emerald-100 transition"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={() => scrollSlider("right")}
                aria-label="Next volunteers"
                className="p-3 rounded-full bg-white text-emerald-900 shadow hover:bg-emerald-100 transition"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 max-w-6xl mx-auto"
              style={{ scrollbarWidth: "none" }}
            >
              {volunteers.map((volunteer, index) => (
                <motion.div
                  key={`${volunteer.rank}-${volunteer.name}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group flex-shrink-0 w-72 sm:w-80 snap-start bg-white rounded-2xl p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative w-28 h-28 mx-auto mb-6">
                    <div className="w-full h-full rounded-full border-4 border-emerald-200 group-hover:border-emerald-400 transition-colors duration-300 bg-emerald-100 flex items-center justify-center">
                      <span className="text-3xl font-bold text-emerald-800">
                        {getInitials(volunteer.name)}
                      </span>
                    </div>

                    <span className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-emerald-800 text-white flex items-center justify-center text-sm font-bold shadow">
                      #{volunteer.rank}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-emerald-900 mb-5">
                    {volunteer.name}
                  </h3>

                  <div className="flex justify-center gap-3 flex-wrap">
                    <span className="text-xs font-medium bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full">
                      {volunteer.totalDrives} Drives
                    </span>

                    <span className="text-xs font-medium bg-emerald-200 text-emerald-900 px-4 py-1.5 rounded-full">
                      {volunteer.totalHours} Hours
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default VolunteerOfMonthSection;
