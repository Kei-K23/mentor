import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full static bottom-0 border-t border-t-slate-200 h-14 flex items-center justify-between px-5">
      <Link
        href={"/terms&conditions"}
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
        href={"/privacy&policy"}
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
