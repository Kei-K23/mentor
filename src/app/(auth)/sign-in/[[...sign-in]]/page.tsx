import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { resolvedTheme } = useTheme();

  return (
    <>
      {resolvedTheme === "dark" ? (
        <SignIn
          path="/sign-in"
          appearance={{
            baseTheme: dark,
          }}
        />
      ) : (
        <SignIn path="/sign-in" />
      )}
    </>
  );
}
