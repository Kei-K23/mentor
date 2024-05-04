import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader className="w-7 h-7 md:w-8 md:h-8 animate-spin" />
    </div>
  );
};

export default Loading;
