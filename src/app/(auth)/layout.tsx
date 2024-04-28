import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center flex-col justify-center">
      <div className="mb-8 space-y-2">
        <h1 className="text-center text-xl md:text-3xl font-bold">Mentor</h1>
        <p className="max-w-[650px] text-center text-lg md:text-xl text-muted-foreground">
          A place for programmers to exploring and practice programming language
          and interview questions
        </p>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
