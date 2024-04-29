import React from "react";
import Header from "./_components/header";
import Footer from "./_components/footer";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default LandingLayout;
