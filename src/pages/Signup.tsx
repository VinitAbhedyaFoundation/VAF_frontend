import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Check,
  X,
  ShieldCheck,
} from "lucide-react";

import api from "@/api/api";

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
  const [showPassword, setShowPassword] = useState(false);

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ─────────────────────────────────────────────
  // PASSWORD STRENGTH
  // ─────────────────────────────────────────────

  const password = form.password;

  const passwordChecks = {
    length: password.length >= 8,
    letter: /[A-Za-z]/.test(password),
    number: /\d/.test(password),
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const basicPasswordValid =
    passwordChecks.length &&
    passwordChecks.letter &&
    passwordChecks.number;

  const strongPassword =
    basicPasswordValid &&
    passwordChecks.uppercase &&
    passwordChecks.lowercase;

  const veryStrongPassword =
    strongPassword && passwordChecks.special;

  const getPasswordStrength = () => {
    if (!password) {
      return {
        label: "",
        width: "0%",
        className: "bg-gray-200",
      };
    }

    if (!basicPasswordValid) {
      return {
        label: "Weak",
        width: "25%",
        className: "bg-red-500",
      };
    }

    if (!strongPassword) {
      return {
        label: "Fair",
        width: "50%",
        className: "bg-yellow-500",
      };
    }

    if (!veryStrongPassword) {
      return {
        label: "Strong",
        width: "75%",
        className: "bg-green-500",
      };
    }

    return {
      label: "Very Strong",
      width: "100%",
      className: "bg-emerald-600",
    };
  };

  const passwordStrength = getPasswordStrength();

  const validateStep1 = () => {
    if (!form.name || !form.email || !form.password) {
      return "Fill all required fields";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return "Invalid email";
    }

    if (form.password.length < 6) {
      return "Password must contain at least 6 characters";
    }

    if (!/[A-Za-z]/.test(form.password)) {
      return "Password must contain at least one letter";
    }

    if (!/\d/.test(form.password)) {
      return "Password must contain at least one number";
    }

    return "";
  };

  const validateStep2 = () => {
    if (!/^\d{10}$/.test(form.phone)) {
      return "Phone must be 10 digits";
    }

    if (!form.gender || !form.bloodGroup) {
      return "Select required fields";
    }

    return "";
  };

  const validateStep3 = () => {
    if (!form.address || !form.parentNumber) {
      return "Fill remaining fields";
    }

    if (!/^\d{10}$/.test(form.parentNumber)) {
      return "Parent number must be 10 digits";
    }

    return "";
  };

  const handleNext = () => {
    let err = "";

    if (step === 1) {
      err = validateStep1();
    }

    if (step === 2) {
      err = validateStep2();
    }

    if (err) {
      setError(err);
      return;
    }

    setError("");
    setStep(step + 1);
  };

  const handleSignup = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const step1Error = validateStep1();

    if (step1Error) {
      setStep(1);
      setError(step1Error);
      return;
    }

    const err = validateStep3();

    if (err) {
      setError(err);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", form);

      navigate("/login");
    } catch (err: any) {
      const message = Array.isArray(
        err.response?.data?.message
      )
        ? err.response.data.message[0]
        : err.response?.data?.message ||
          "Signup failed";

      setError(message);
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-2xl font-semibold text-gray-800">
            Create Account
          </h1>

          <p className="text-sm text-gray-600">
            Step {step} of 3
          </p>

          {/* Progress */}
          <div
            className="mt-4 h-2 bg-gray-200 rounded-full"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={3}
            aria-valuenow={step}
            aria-label={`Signup progress: step ${step} of 3`}
          >
            <div
              className="h-2 bg-green-600 rounded-full transition-all"
              style={{
                width: `${(step / 3) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div
            role="alert"
            className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm"
          >
            {error}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSignup}
          className="space-y-6"
        >
          {/* STEP 1 */}
          {step === 1 && (
            <div className="grid grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs text-gray-700 mb-1"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs text-gray-700 mb-1"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  className={inputStyle}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </div>

              {/* Password */}
              <div className="col-span-2">
                <label
                  htmlFor="password"
                  className="block text-xs text-gray-700 mb-1"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={form.password}
                    onChange={handleChange}
                    className={`${inputStyle} pr-12`}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {/* Password Strength */}
                {password && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-600">
                        Password strength
                      </span>

                      <span
                        className={`text-xs font-bold ${
                          passwordStrength.label ===
                          "Weak"
                            ? "text-red-600"
                            : passwordStrength.label ===
                                "Fair"
                              ? "text-yellow-700"
                              : "text-green-700"
                        }`}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>

                    <div
                      className="h-1.5 bg-gray-200 rounded-full overflow-hidden"
                      aria-hidden="true"
                    >
                      <div
                        className={`h-full rounded-full transition-all ${passwordStrength.className}`}
                        style={{
                          width:
                            passwordStrength.width,
                        }}
                      />
                    </div>

                    {/* Password Requirements */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-2 mb-3">
                        <ShieldCheck
                          size={16}
                          className="text-green-600"
                          aria-hidden="true"
                        />

                        <p className="text-xs font-bold text-gray-700">
                          Create a strong password
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <PasswordRequirement
                          valid={passwordChecks.length}
                          text="At least 8 characters"
                        />

                        <PasswordRequirement
                          valid={passwordChecks.letter}
                          text="Contains a letter"
                        />

                        <PasswordRequirement
                          valid={passwordChecks.number}
                          text="Contains a number"
                        />

                        <PasswordRequirement
                          valid={passwordChecks.uppercase}
                          text="Uppercase letter"
                        />

                        <PasswordRequirement
                          valid={passwordChecks.lowercase}
                          text="Lowercase letter"
                        />

                        <PasswordRequirement
                          valid={passwordChecks.special}
                          text="Special character"
                        />
                      </div>

                      {!strongPassword && (
                        <p className="mt-3 text-xs text-amber-700">
                          💡 Tip: Use a mix of
                          uppercase and lowercase
                          letters, numbers, and a
                          special character for a
                          stronger password.
                        </p>
                      )}

                      {strongPassword &&
                        !veryStrongPassword && (
                          <p className="mt-3 text-xs text-green-700">
                            👍 Good password! Add a
                            special character to
                            make it even stronger.
                          </p>
                        )}

                      {veryStrongPassword && (
                        <p className="mt-3 text-xs text-emerald-700 font-medium">
                          🔐 Excellent! Your password
                          is very strong.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="grid grid-cols-2 gap-5">
              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs text-gray-700 mb-1"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="10-digit phone number"
                  autoComplete="tel"
                  inputMode="numeric"
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-xs text-gray-700 mb-1"
                >
                  Gender
                </label>

                <select
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                >
                  <option value="">Select</option>
                  <option value="Male">
                    Male
                  </option>
                  <option value="Female">
                    Female
                  </option>
                </select>
              </div>

              {/* Blood Group */}
              <div>
                <label
                  htmlFor="bloodGroup"
                  className="block text-xs text-gray-700 mb-1"
                >
                  Blood Group
                </label>

                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={form.bloodGroup}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                >
                  <option value="">Select</option>
                  <option value="A_POSITIVE">
                    A+
                  </option>
                  <option value="A_NEGATIVE">
                    A-
                  </option>
                  <option value="B_POSITIVE">
                    B+
                  </option>
                  <option value="B_NEGATIVE">
                    B-
                  </option>
                  <option value="AB_POSITIVE">
                    AB+
                  </option>
                  <option value="AB_NEGATIVE">
                    AB-
                  </option>
                  <option value="O_POSITIVE">
                    O+
                  </option>
                  <option value="O_NEGATIVE">
                    O-
                  </option>
                </select>
              </div>

              {/* Birth Date */}
              <div>
                <label
                  htmlFor="birthDate"
                  className="block text-xs text-gray-700 mb-1"
                >
                  Birth Date
                </label>

                <input
                  id="birthDate"
                  type="date"
                  name="birthDate"
                  value={form.birthDate}
                  onChange={handleChange}
                  className={inputStyle}
                  autoComplete="bday"
                />
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="grid grid-cols-2 gap-5">
              {/* Qualification */}
              <div>
                <label
                  htmlFor="highestQualification"
                  className="block text-xs text-gray-700 mb-1"
                >
                  Qualification
                </label>

                <input
                  id="highestQualification"
                  name="highestQualification"
                  value={
                    form.highestQualification
                  }
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="e.g. BTech"
                />
              </div>

              {/* Occupation */}
              <div>
                <label
                  htmlFor="occupation"
                  className="block text-xs text-gray-700 mb-1"
                >
                  Occupation
                </label>

                <select
                  id="occupation"
                  name="occupation"
                  value={form.occupation}
                  onChange={handleChange}
                  className={inputStyle}
                >
                  <option value="">Select</option>
                  <option value="Student">
                    Student
                  </option>
                  <option value="WorkingProfessional">
                    Working Professional
                  </option>
                </select>
              </div>

              {/* Address */}
              <div className="col-span-2">
                <label
                  htmlFor="address"
                  className="block text-xs text-gray-700 mb-1"
                >
                  Address
                </label>

                <input
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="Enter your address"
                  autoComplete="street-address"
                  required
                />
              </div>

              {/* Parent Number */}
              <div className="col-span-2">
                <label
                  htmlFor="parentNumber"
                  className="block text-xs text-gray-700 mb-1"
                >
                  Parent Number
                </label>

                <input
                  id="parentNumber"
                  name="parentNumber"
                  type="tel"
                  value={form.parentNumber}
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="10-digit parent number"
                  inputMode="numeric"
                  required
                />
              </div>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex items-center justify-between pt-2">
            {step > 1 && (
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setStep(step - 1);
                }}
                className="text-sm text-gray-700 hover:text-black"
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
                className="ml-auto bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition text-sm disabled:opacity-60"
              >
                {loading
                  ? "Submitting..."
                  : "Create Account"}
              </button>
            )}
          </div>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{" "}

          <Link
            to="/login"
            className="text-green-700 hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────
// PASSWORD REQUIREMENT COMPONENT
// ─────────────────────────────────────────────

const PasswordRequirement = ({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      {valid ? (
        <Check
          size={14}
          className="text-green-600 flex-shrink-0"
          aria-hidden="true"
        />
      ) : (
        <X
          size={14}
          className="text-gray-500 flex-shrink-0"
          aria-hidden="true"
        />
      )}

      <span
        className={`text-xs ${
          valid
            ? "text-green-700"
            : "text-gray-600"
        }`}
      >
        {text}
      </span>
    </div>
  );
};

export default Signup;