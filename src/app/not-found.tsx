"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <h2 className="text-xl md:text-2xl font-bold">Page Not Found</h2>
      <p className="text-lg mt-2">
        <span className="font-bold">{pathname}</span> is not a valid route.
      </p>
      <Link
        href="/learn"
        className={cn(
          "mt-4",
          buttonVariants({
            variant: "ghost",
          })
        )}
      >
        Back to Home
      </Link>
    </div>
  );
}
