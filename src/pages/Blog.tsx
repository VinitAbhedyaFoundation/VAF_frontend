import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const blogs = [
  {
    id: 0,
    title: "What Does Vinit Abhedya Foundation Do?",
    slug: "vinit-abhedya-foundation-work",
    description:
      "Discover how the foundation works at grassroots level to create impact in environment, education, and women empowerment.",
    image: "/images/Ploggers/community1.jpeg",
    category: "Foundation",
  },
  {
    id: 1,
    title: "What is Plogging and Why It Matters in India",
    slug: "what-is-plogging-india",
    description:
      "Discover how plogging combines fitness with environmental action and how communities are making cities cleaner.",
    image: "/images/Ploggers/hero-bg.jpeg",
    category: "Environment",
  },
  {
    id: 2,
    title: "Menstrual Health Awareness: Breaking Myths and Taboos",
    slug: "menstrual-health-awareness-india",
    description:
      "Understanding menstrual health, addressing stigma, and empowering women through awareness and education.",
    image: "/images/Laalbindi/hero-bg.jpeg",
    category: "Women Empowerment",
  },
  {
    id: 3,
    title: "Building a Reading Community: The Social Shelf Initiative",
    slug: "social-shelf-reading-community",
    description:
      "How Social Shelf is creating a culture of reading and sharing knowledge within communities.",
    image: "/images/TSS/hero-bg.jpeg",
    category: "Education",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-24">

      {/* 🔥 HOME BUTTON */}
      <div className="max-w-6xl mx-auto mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-green-600 font-medium hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>
      </div>

      {/* ✨ HERO */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Stories That Create Impact 🌱
        </h1>
        <p className="text-gray-600 text-lg">
          Explore how small initiatives are creating big change in communities.
        </p>
      </div>

      {/* 🔥 BLOG GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">

        {blogs.map((blog, index) => (
          <div
            key={blog.id}
            className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 group ${
              index === 0 ? "lg:col-span-2" : ""
            }`}
          >
            {/* IMAGE */}
            <div className="overflow-hidden relative">
              <img
                src={blog.image}
                alt={blog.title}
                className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                  index === 0 ? "h-64" : "h-52"
                }`}
              />

              {/* CATEGORY BADGE */}
              <span className="absolute top-4 left-4 bg-white/90 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                {blog.category}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-3 group-hover:text-green-600 transition">
                {blog.title}
              </h2>

              <p className="text-gray-600 text-sm mb-5">
                {blog.description}
              </p>

              <Link
                to={`/blog/${blog.slug}`}
                className="inline-flex items-center gap-2 text-green-600 font-medium hover:gap-3 transition-all"
              >
                Read Story →
              </Link>
            </div>
          </div>
        ))}

      </div>

      {/* ✨ CTA */}
      <div className="text-center mt-20">
        <h3 className="text-2xl font-semibold mb-4">
          Be part of something meaningful 💚
        </h3>

        <Link
          to="/donate"
          className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition shadow-md hover:shadow-lg"
        >
          Support Our Work
        </Link>
      </div>
    </div>
  );
};

export default Blog;