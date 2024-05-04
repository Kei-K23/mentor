import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <h2 className="text-xl md:text-2xl font-bold">Not Found</h2>
      <p className="text-lg mt-2">User doest not exist.</p>
      <Link
        href="/profile"
        className={cn(
          "mt-4",
          buttonVariants({
            variant: "ghost",
          })
        )}
      >
        Back to profile
      </Link>
    </div>
  );
}
