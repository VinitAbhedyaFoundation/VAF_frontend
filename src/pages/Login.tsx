import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const inputStyle =
  "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition text-sm";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      // ❗ Proper validation
      if (!res.ok || !data.token) {
        setError(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      // ✅ Clear old data (VERY IMPORTANT)
      localStorage.clear();

      // ✅ Store fresh auth data
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      console.log("STORED ROLE:", data.role);

      // 🔥 ROLE-BASED NAVIGATION
      if (data.role === "Admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.error(err);
      setError("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg"
      >
        {/* HEADER */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500">
            Login to continue
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <p className="text-xs text-gray-500 mb-1">Email</p>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Password</p>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl transition text-sm"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-center mt-5 text-gray-500">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-600 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;