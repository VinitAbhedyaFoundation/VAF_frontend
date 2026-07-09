import type { FC } from "react";
import type { CertificatesProps } from "@/types/user";

import { motion } from "framer-motion";
import { Award, Download } from "lucide-react";

import { getCertIcon } from "../utils/certificate";

const Certificates: FC<CertificatesProps> = ({ certificates }) => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black">My Certificates</h1>
                <p className="text-slate-500 text-sm mt-1">
                    Download and share your volunteer achievements.
                </p>
            </div>
            {certificates.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center text-slate-400">
                    <Award size={36} className="mx-auto mb-3 opacity-30" />
                    <p className="font-bold">No certificates yet.</p>
                    <p className="text-sm mt-1">
                        Complete a drive and get approved to earn one.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all"
                        >
                            <div
                                className={`h-2 w-full ${cert.type === "excellence"
                                    ? "bg-gradient-to-r from-yellow-400 to-amber-500"
                                    : cert.type === "milestone"
                                        ? "bg-gradient-to-r from-orange-400 to-red-500"
                                        : "bg-gradient-to-r from-emerald-400 to-teal-500"
                                    }`}
                            />
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
                                        {getCertIcon(cert.type)}
                                    </div>
                                    <span
                                        className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${cert.type === "excellence"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : cert.type === "milestone"
                                                ? "bg-orange-100 text-orange-700"
                                                : "bg-emerald-100 text-emerald-700"
                                            }`}
                                    >
                                        {cert.type}
                                    </span>
                                </div>
                                <h3 className="text-lg font-black text-slate-900 mb-1">
                                    {cert.title}
                                </h3>
                                <p className="text-sm text-slate-500 mb-4">
                                    {cert.drive}
                                </p>
                                <a
                                    href={cert.file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl border-2 border-slate-200 text-sm font-bold text-slate-700 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 transition"
                                >
                                    <Download size={15} />
                                    Download PDF
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Certificates;
