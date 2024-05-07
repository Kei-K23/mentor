import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full sticky bottom-0 border-t border-t-slate-200 dark:border-t-slate-700 h-14 flex items-center justify-between px-5 bg-background">
      <Link
        href={"/terms"}
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "sm",
          })
        )}
      >
        Terms and Conditions
      </Link>
      <Link
        href={"/privacy"}
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "sm",
          })
        )}
      >
        Privacy and Policy
      </Link>
    </footer>
  );
};

export default Footer;
