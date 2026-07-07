import React from "react";
import Spinner from "./Spinner";

const SectionLoader: React.FC = () => (
  <div className="flex items-center justify-center py-20">
    <Spinner size={32} />
  </div>
);

export default SectionLoader;