import type { FC } from "react";

interface AvatarProps {
    name: string;
    size?: "sm" | "md" | "lg";
}

const Avatar: FC<AvatarProps> = ({
    name,
    size = "md",
}) => {
    const initials = name
        .trim()
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const gradients = [
        "from-emerald-400 to-emerald-600",
        "from-indigo-400 to-indigo-600",
        "from-amber-400 to-amber-600",
        "from-sky-400 to-sky-600",
        "from-pink-400 to-pink-600",
    ];

    const gradient =
        gradients[name.charCodeAt(0) % gradients.length];

    const sizeClass = {
        sm: "w-8 h-8 text-xs",
        md: "w-9 h-9 text-sm",
        lg: "w-20 h-20 text-3xl",
    };

    return (
        <div
            className={`
                ${sizeClass[size]}
                bg-gradient-to-br
                ${gradient}
                rounded-full
                flex
                items-center
                justify-center
                flex-shrink-0
                font-black
                text-white
                select-none
            `}
        >
            {initials || "?"}
        </div>
    );
};

export default Avatar;