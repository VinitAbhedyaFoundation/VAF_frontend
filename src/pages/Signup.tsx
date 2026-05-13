import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

type FormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  bloodGroup: string;
  birthDate: string;
  gender: string;
  highestQualification: string;
  occupation: string;
  address: string;
  parentNumber: string;
};

const inputStyle =
  "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition text-sm";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    bloodGroup: "",
    birthDate: "",
    gender: "",
    highestQualification: "",
    occupation: "",
    address: "",
    parentNumber: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    if (!form.name || !form.email || !form.password)
      return "Fill all required fields";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Invalid email";
    if (form.password.length < 6) return "Password too short";
    return "";
  };

  const validateStep2 = () => {
    if (!/^\d{10}$/.test(form.phone)) return "Phone must be 10 digits";
    if (!form.gender || !form.bloodGroup) return "Select required fields";
    return "";
  };

  const validateStep3 = () => {
    if (!form.address || !form.parentNumber)
      return "Fill remaining fields";
    return "";
  };

  const handleNext = () => {
    let err = "";
    if (step === 1) err = validateStep1();
    if (step === 2) err = validateStep2();
    if (err) return setError(err);

    setError("");
    setStep(step + 1);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateStep3();
    if (err) return setError(err);

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message?.[0] || "Signup failed");
        setLoading(false);
        return;
      }

      navigate("/login");
    } catch {
      setError("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-white p-10 rounded-3xl shadow-lg"
      >
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create Account
          </h2>
          <p className="text-sm text-gray-500">Step {step} of 3</p>

          {/* Progress */}
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-green-600 rounded-full transition-all"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 text-red-500 text-sm">{error}</div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-xs text-gray-500 mb-1">Full Name</p>
                <input name="name" onChange={handleChange} className={inputStyle} />
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <input name="email" type="email" onChange={handleChange} className={inputStyle} />
              </div>

              <div className="col-span-2">
                <p className="text-xs text-gray-500 mb-1">Password</p>
                <input name="password" type="password" onChange={handleChange} className={inputStyle} />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-xs text-gray-500 mb-1">Phone</p>
                <input name="phone" onChange={handleChange} className={inputStyle} />
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Gender</p>
                <select name="gender" onChange={handleChange} className={inputStyle}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Blood Group</p>
                <select name="bloodGroup" onChange={handleChange} className={inputStyle}>
                  <option value="">Select</option>
                  <option value="O_POSITIVE">O+</option>
                  <option value="A_POSITIVE">A+</option>
                  <option value="B_POSITIVE">B+</option>
                </select>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Birth Date</p>
                <input type="date" name="birthDate" onChange={handleChange} className={inputStyle} />
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-xs text-gray-500 mb-1">Qualification</p>
                <input name="highestQualification" onChange={handleChange} className={inputStyle} />
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Occupation</p>
                <select name="occupation" onChange={handleChange} className={inputStyle}>
                  <option value="">Select</option>
                  <option value="Student">Student</option>
                  <option value="WorkingProfessional">Working Professional</option>
                </select>
              </div>

              <div className="col-span-2">
                <p className="text-xs text-gray-500 mb-1">Address</p>
                <input name="address" onChange={handleChange} className={inputStyle} />
              </div>

              <div className="col-span-2">
                <p className="text-xs text-gray-500 mb-1">Parent Number</p>
                <input name="parentNumber" onChange={handleChange} className={inputStyle} />
              </div>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex items-center justify-between pt-2">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="text-sm text-gray-500 hover:text-black"
              >
                ← Back
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition text-sm"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="ml-auto bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition text-sm"
              >
                {loading ? "Submitting..." : "Create Account"}
              </button>
            )}
          </div>
        </form>

        <p className="text-sm text-center mt-6 text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;