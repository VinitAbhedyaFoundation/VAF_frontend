import { Trophy, Flame, Heart } from "lucide-react";
import type { Certificate } from "@/types/user";

export const getCertIcon = (type: Certificate["type"]) => {
    if (type === "excellence") {
        return <Trophy size={28} className="text-yellow-500" />;
    }

    if (type === "milestone") {
        return <Flame size={28} className="text-orange-500" />;
    }

    return <Heart size={28} className="text-emerald-500" />;
};