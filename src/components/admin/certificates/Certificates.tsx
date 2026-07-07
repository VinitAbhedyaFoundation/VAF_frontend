import { Award, Upload } from "lucide-react";

const Certificates: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold themed-text">
            Certificate Templates
          </h1>

          <p className="themed-secondary mt-1">
            Manage reusable certificate templates for volunteer drives.
          </p>
        </div>

        <button
          disabled
          className="accent-bg text-white px-5 py-2.5 rounded-xl text-sm font-bold opacity-50 cursor-not-allowed"
        >
          <Upload size={16} className="inline mr-2" />
          Upload Template
        </button>
      </div>

      <div className="themed-card rounded-3xl border themed-border p-16 text-center">
        <Award
          size={60}
          className="mx-auto accent-text mb-5"
        />

        <h2 className="text-2xl font-black themed-text mb-3">
          Certificate Templates
        </h2>

        <p className="themed-secondary max-w-xl mx-auto">
          Upload reusable templates, assign them to drive types,
          manage versions, and generate certificates for volunteers.
        </p>

        <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full accent-bg-soft accent-text text-sm font-semibold">
          🚧 Module under development
        </div>
      </div>
    </div>
  );
};

export default Certificates;