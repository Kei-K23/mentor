import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <div className="sticky top-0 lg:pt-[5px] dark:text-slate-200 text-slate-800 flex items-center justify-between border-b-2 mb-8 pb-1">
      <Link href={"/courses"}>
        <Button size={"sm"} variant={"ghost"}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </Link>
      <h1 className="text-lg font-bold">{title}</h1>
      <div />
    </div>
  );
};

export default Header;
