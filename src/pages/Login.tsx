import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/api";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await API.post(
        "/auth/login",
        form
      );

      const data = res.data;

      // Token fallback support
      const token =
        data.accessToken || data.token;

      if (!token) {
        setError("Invalid credentials");
        setLoading(false);
        return;
      }

      // Get user safely
      const user = data.user;

      if (!user) {
        setError("User data missing");
        setLoading(false);
        return;
      }

      const role = user.role;

      // Clear previous session
      localStorage.clear();

      // Store auth data
      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "role",
        role
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // Role-based redirect
      if (role === "SuperAdmin") {
        navigate("/superadmin-dashboard");
      } else if (role === "Admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        setError("Invalid email or password");
      } else {
        setError(
          "Unable to login. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-xl font-semibold text-gray-800">
            Welcome Back
          </h1>

          <p className="text-sm text-gray-600">
            Login to continue
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div
            role="alert"
            className="mb-4 text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-lg py-2 px-3"
          >
            {error}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-xs text-gray-700 mb-1"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className={inputStyle}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs text-gray-700 mb-1"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              className={inputStyle}
              required
              autoComplete="current-password"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl transition text-sm disabled:opacity-60"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </motion.button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-center mt-5 text-gray-600">
          Don’t have an account?{" "}

          <Link
            to="/signup"
            className="text-green-700 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;