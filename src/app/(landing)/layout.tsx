import React from "react";
import Header from "./_components/header";
import Footer from "./_components/footer";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col">
      <div className="h-full relative w-full">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default LandingLayout;
