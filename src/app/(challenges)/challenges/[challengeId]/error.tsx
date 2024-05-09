"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <h2 className="text-xl md:text-3xl font-bold mb-3">
        Oh! Something went wrong
      </h2>
      <Image src={"/robot-error.png"} alt="error img" width={120} height={60} />
      <p className="max-w-[700px] text-center mt-8">
        This could be third-party error because honestly Mentor only use free
        services or due to internal code issues.
      </p>
      <Button
        onClick={() => window.location.reload()}
        className="my-3"
        variant={"secondary"}
      >
        Please refresh the page again
      </Button>
      <Link href={"/learn"} className="hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
