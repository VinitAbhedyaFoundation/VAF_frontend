import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Volunteer",
    quote:
      "Being part of Sambhajinagar Ploggers changed my perspective. Every morning run became a chance to make our city cleaner and greener.",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Rohit Deshmukh",
    role: "Community Leader",
    quote:
      "The Social Shelf initiative has transformed our neighborhood. Children now have access to books they could never afford. Knowledge truly is free now.",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Anita Jadhav",
    role: "Laal Bindi Advocate",
    quote:
      "Laal Bindi gave me the courage to speak up. It's more than a symbol — it's a movement that unites women across communities.",
    image: "https://i.pravatar.cc/150?img=23",
  },
  {
    name: "Suresh Patil",
    role: "Environmental Activist",
    quote:
      "In two years, we've cleaned over 50 public spaces. The foundation's vision inspires ordinary people to do extraordinary things.",
    image: "https://i.pravatar.cc/150?img=53",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () =>
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, []);

  const t = testimonials[current];

  return (
    <section className="pt-20 pb-24 bg-gradient-to-b from-emerald-50 via-white to-emerald-100">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-body font-semibold text-primary uppercase tracking-wider">
            Community Voices
          </span>
        </motion.div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-card rounded-3xl p-8 md:p-12 shadow-elevated"
            >
              <Quote className="w-10 h-10 text-primary/30 mx-auto mb-6" />

              <p className="text-lg md:text-xl font-body text-foreground leading-relaxed mb-8 italic">
                “{t.quote}”
              </p>

              <div className="flex items-center justify-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                />
                <div className="text-left">
                  <div className="font-display font-semibold text-foreground">
                    {t.name}
                  </div>
                  <div className="font-body text-sm text-muted-foreground">
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === current ? "bg-primary w-7" : "bg-border w-2.5"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
