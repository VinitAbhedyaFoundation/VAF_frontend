import { useParams, Link } from "react-router-dom";

const blogData = {
  "vinit-abhedya-foundation-work": {
    title: "What Does Vinit Abhedya Foundation Do?",
    image: "/images/Ploggers/community1.jpeg",
    category: "Foundation",
    content: `
Vinit Abhedya Foundation is a grassroots NGO working in Chhatrapati Sambhajinagar (Aurangabad) 
to create meaningful impact in society.

The organization focuses on environmental awareness, public cleanliness drives, 
education support, and women empowerment initiatives.

Through programs like Sambhajinagar Ploggers, Social Shelf, and Laal Bindi, 
the foundation addresses real-world challenges at the community level.

By collaborating with volunteers, local communities, and partners, 
the foundation builds sustainable and long-term solutions.

Every initiative is driven by one vision — to create a cleaner, more educated, 
and empowered society.

Small consistent actions lead to big transformations.
    `,
  },

  "what-is-plogging-india": {
    title: "What is Plogging and Why It Matters in India",
    image: "/images/Ploggers/hero-bg.jpeg",
    category: "Environment",
    content: `
Plogging is a powerful combination of jogging and picking up litter. 
It is not just a fitness trend but a social movement that promotes environmental awareness.

In India, urban pollution and waste management are growing challenges. 
Initiatives like plogging help reduce litter while encouraging people to stay active.

Organizations like Vinit Abhedya Foundation organize plogging drives 
to clean public spaces and inspire communities to take responsibility.

By participating in plogging, individuals contribute to a cleaner environment 
and improve their health.

Small actions can create a massive impact when done collectively.
    `,
  },

  "menstrual-health-awareness-india": {
    title: "Menstrual Health Awareness: Breaking Myths and Taboos",
    image: "/images/Laalbindi/hero-bg.jpeg",
    category: "Women Empowerment",
    content: `
Menstrual health is still surrounded by stigma and misinformation in many parts of India.

Breaking these myths is essential for dignity and confidence among women and girls.

Awareness programs educate communities, promote hygiene, and eliminate harmful taboos.

Initiatives like Laal Bindi create safe spaces for conversations and empowerment.

Normalizing menstrual health discussions empowers generations.
    `,
  },

  "social-shelf-reading-community": {
    title: "Building a Reading Community: The Social Shelf Initiative",
    image: "/images/TSS/hero-bg.jpeg",
    category: "Education",
    content: `
Reading is one of the most powerful ways to grow knowledge and imagination.

The Social Shelf initiative encourages communities to share books 
and build a culture of reading.

By making books accessible, individuals are empowered to learn and grow.

Community libraries create belonging and collective development.

A reading community builds a stronger society.
    `,
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const blog = blogData[slug as keyof typeof blogData];

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">Blog not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-24">

      {/* BACK BUTTON */}
      <div className="max-w-5xl mx-auto mb-6">
        <Link
          to="/blog"
          className="text-green-600 font-medium hover:underline"
        >
          ← Back to Blog
        </Link>
      </div>

      {/* HERO */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        
        {/* IMAGE */}
        <div className="overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-72 md:h-96 object-cover hover:scale-105 transition duration-500"
          />
        </div>

        {/* CONTENT */}
        <div className="p-8 md:p-10">
          <span className="inline-block text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full uppercase tracking-wide mb-4">
            {blog.category}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            {blog.title}
          </h1>

          <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
            {blog.content
              .trim()
              .split("\n")
              .filter((p) => p.trim() !== "")
              .map((para, index) => (
                <p key={index}>{para}</p>
              ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h3 className="text-2xl font-semibold mb-4">
            Be part of the change 💚
          </h3>

          <p className="text-gray-600 mb-6">
            Support our initiatives and help us create meaningful impact in society.
          </p>

          <Link
            to="/donate"
            className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;