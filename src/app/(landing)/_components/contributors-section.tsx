import { robotoSlab } from "@/app/font";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { contributors } from "@/shared/contributors-list";
import Link from "next/link";
import React from "react";

const ContributorsSection = () => {
  return (
    <div className="max-w-[980px] mx-auto flex flex-col items-center justify-center p-4 my-40">
      <h2
        className={cn(
          "text-center text-xl lg:text-3xl mb-2",
          robotoSlab.className
        )}
      >
        Our contributors
      </h2>
      <p className="text-center text-base">
        This project grows with the contributions of these contributors.
      </p>
      <div className="mt-8 grid grid-cols-12 gap-4">
        {contributors.map((c) => (
          <Link
            href={c.githubLink}
            key={c.githubLink}
            className="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2 cursor-pointer bg-slate-200 dark:bg-slate-800 rounded-xl p-3 px-5 flex flex-col items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-700"
            target="_blank"
          >
            <Avatar className="h-[90px] w-[90px]">
              <AvatarImage
                src={`${c.githubLink}.png`}
                className="object-cover"
              />
              <AvatarFallback>{c.name}</AvatarFallback>
            </Avatar>
            <p className="mt-2">{c.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContributorsSection;
