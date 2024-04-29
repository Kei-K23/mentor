"use client";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { resolvedTheme } = useTheme();

  return (
    <>
      {resolvedTheme === "dark" ? (
        <SignUp
          path="/sign-up"
          appearance={{
            baseTheme: dark,
          }}
        />
      ) : (
        <SignUp path="/sign-up" />
      )}
    </>
  );
}
