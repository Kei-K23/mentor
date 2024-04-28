import React from "react";
import Header from "./_components/header";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col">
      <Header />
      {children}
    </div>
  );
};

export default LandingLayout;
