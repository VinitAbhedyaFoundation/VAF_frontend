import { Mail } from "lucide-react";

const Donate = () => {
  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-xl w-full text-center space-y-6">

        <Mail className="w-10 h-10 text-emerald-600 mx-auto" />

        <h1 className="text-3xl font-bold text-slate-900">
          Donations Coming Soon
        </h1>

        <p className="text-slate-600 leading-relaxed">
          We are currently setting up our donation system to ensure secure and transparent contributions.
        </p>

        <p className="text-slate-700">
          For any enquiries or to support us directly, reach out at:
        </p>

        <a
          href="mailto:admin@vinitabhedyafoundation.com"
          className="inline-block text-lg font-semibold text-emerald-700 hover:underline"
        >
          admin@vinitabhedyafoundation.com
        </a>

        <p className="text-sm text-slate-500 pt-4">
          We appreciate your patience. Something better is coming.
        </p>

      </div>
    </div>
  );
};

export default Donate;