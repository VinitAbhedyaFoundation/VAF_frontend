import { CheckCircle, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NewsletterSuccess = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 via-white to-emerald-100 px-4">
      
      <div className="max-w-xl w-full text-center bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-emerald-100">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-green-900 mb-3">
          You’re Subscribed 🎉
        </h1>

        {/* Message */}
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
          Thank you for subscribing to our newsletter.
          You’ll now receive updates about our plogging drives,
          community events, and impact stories.
        </p>

        {/* Highlight Box */}
        <div className="flex items-center justify-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 mb-8">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span className="text-sm text-emerald-700 font-medium">
            Updates arrive every Friday
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          
          <Link to="/">
            <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white">
              Back to Home
            </Button>
          </Link>

          <Link to="/ploggers">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            >
              Explore Drives
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

        </div>

      </div>
    </section>
  );
};

export default NewsletterSuccess;