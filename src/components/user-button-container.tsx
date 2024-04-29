"use client";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import React from "react";
import { dark } from "@clerk/themes";

const UserButtonContainer = () => {
  const { resolvedTheme } = useTheme();
  return (
    <>
      {resolvedTheme === "dark" ? (
        <UserButton
          afterSignOutUrl="/"
          showName={true}
          afterMultiSessionSingleSignOutUrl="/"
          appearance={{
            baseTheme: dark,
          }}
        />
      ) : (
        <UserButton
          afterSignOutUrl="/"
          showName={true}
          afterMultiSessionSingleSignOutUrl="/"
        />
      )}
    </>
  );
};

export default UserButtonContainer;
