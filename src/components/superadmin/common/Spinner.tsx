"use client";

import { FC } from "react";
import { Loader2 } from "lucide-react";

interface SpinnerProps {
  size?: number;
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({
  size = 20,
  className = "",
}) => {
  return (
    <Loader2
      size={size}
      className={`animate-spin text-emerald-600 ${className}`}
    />
  );
};

export default Spinner;