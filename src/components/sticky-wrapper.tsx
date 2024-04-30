import React from "react";

type StickyWrapperProps = {
  children: React.ReactNode;
};

const StickyWrapper = ({ children }: StickyWrapperProps) => {
  return (
    <div className="hidden lg:block max-w-[368px] sticky self-end bottom-6">
      <div className="min-h-[calc(100vh-48px)] sticky top-6 flex flex-col gap-y-4">
        {children}
      </div>
    </div>
  );
};

export default StickyWrapper;
