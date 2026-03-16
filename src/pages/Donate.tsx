import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Donate = () => {
  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-xl w-full text-center space-y-6">

        <Heart className="w-10 h-10 text-emerald-600 mx-auto" />

        <h1 className="text-3xl font-bold text-slate-900">
          Support Our Mission
        </h1>

        <p className="text-slate-600 leading-relaxed">
          Your contribution helps us organize environmental drives,
          empower communities, and support education initiatives.
        </p>

        <div className="space-y-4">
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
            Donate ₹100
          </Button>

          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
            Donate ₹500
          </Button>

          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
            Donate ₹1000
          </Button>
        </div>

        <p className="text-sm text-slate-500">
          Secure payment • 100% transparent use of funds
        </p>

      </div>
    </div>
  );
};

export default Donate;