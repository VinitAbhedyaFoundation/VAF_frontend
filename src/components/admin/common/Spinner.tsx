import React from "react";
import { Loader2 } from "lucide-react";

interface SpinnerProps {
  size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 20 }) => (
  <Loader2 size={size} className="animate-spin accent-text" />
);

export default Spinner;