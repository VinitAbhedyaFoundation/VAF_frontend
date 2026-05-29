import React from "react";
import {
  Heart,
  Shirt,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  IndianRupee,
} from "lucide-react";

export default function Donate() {
  return (
    <div className="min-h-screen bg-[#F4F7F5]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 to-slate-900 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 py-24 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            Make A Difference Today
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-slate-300">
            Support communities through cloth donations and financial
            contributions. Every donation helps us reach more families,
            organize more drives, and create lasting impact.
          </p>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid md:grid-cols-4 gap-5">
          {[
            {
              value: "500+",
              label: "Families Helped",
            },
            {
              value: "1200+",
              label: "Clothes Distributed",
            },
            {
              value: "150+",
              label: "Volunteers",
            },
            {
              value: "₹2L+",
              label: "Funds Raised",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center"
            >
              <h3 className="text-3xl font-black text-emerald-700">
                {item.value}
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DONATION OPTIONS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-8">

          {/* CLOTH DONATION */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
              <Shirt className="text-emerald-600" size={30} />
            </div>

            <h2 className="text-3xl font-black text-slate-900 mb-4">
              Cloth Donation
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Donate clothes, blankets, shoes, school uniforms,
              winter wear and other usable essentials. Our team
              coordinates collection and distribution to families
              who need them the most.
            </p>

            <div className="space-y-4 mb-8">

              <div className="flex items-center gap-3 text-slate-700">
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <Mail size={18} />
                <span>info@vinitabhedyafoundation.org</span>
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <MapPin size={18} />
                <span>Pune, Maharashtra</span>
              </div>

            </div>

            <div className="flex gap-4 flex-wrap">

              <a
                href="tel:+918856859643"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold transition"
              >
                Call Us
              </a>

              <a
                href="https://wa.me/8856859643"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-slate-200 hover:border-emerald-300 px-6 py-3 rounded-2xl font-bold transition"
              >
                WhatsApp Us
              </a>

            </div>
          </div>

          {/* FINANCIAL DONATION */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
              <IndianRupee className="text-emerald-600" size={30} />
            </div>

            <h2 className="text-3xl font-black text-slate-900 mb-4">
              Financial Support
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Help us organize drives, support medical aid,
              distribute resources, and expand our community
              outreach efforts. Every contribution directly
              supports our mission.
            </p>

            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 mb-8">
              <h4 className="font-bold text-emerald-700 mb-2">
                Your donation supports:
              </h4>

              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Cloth distribution drives</li>
                <li>• Medical support initiatives</li>
                <li>• Volunteer programs</li>
                <li>• Community outreach campaigns</li>
              </ul>
            </div>

            <a
              href="https://buy.stripe.com/test_5kQdRa5pebBu5kxem60RG00"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold transition"
            >
              Donate Now
              <ArrowRight size={18} />
            </a>
          </div>

        </div>
      </section>

      {/* WHY DONATE */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-[2rem] border border-slate-100 p-10 shadow-sm text-center">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-100 flex items-center justify-center mb-5">
            <Heart className="text-red-500" size={28} />
          </div>

          <h2 className="text-3xl font-black text-slate-900 mb-4">
            Why Your Support Matters
          </h2>

          <p className="max-w-3xl mx-auto text-slate-600 leading-relaxed">
            Every cloth donated and every rupee contributed helps us
            reach individuals and families facing hardship. Together,
            we can provide essentials, create opportunities, and build
            stronger communities through meaningful action.
          </p>

        </div>
      </section>
    </div>
  );
}