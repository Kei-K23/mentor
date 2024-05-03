import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ActiveCourseCardProps = {
  title: string;
  description?: string | null;
  imageSrc: string | null;
  active: boolean;
};

const ActiveCourseCard = ({
  imageSrc,
  title,
  active,
  description,
}: ActiveCourseCardProps) => {
  return (
    <Link
      href={"/learn"}
      className={cn(
        "relative h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-center p-3 pb-6 max-h-[217px] max-w-[200px] select-none",
        active && "border-sky-300"
      )}
    >
      <Image src={imageSrc!} alt={title} width={94} height={70} />

      <p className="text-slate-800 dark:text-slate-200 font-bold mt-3">
        {title}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </Link>
  );
};

export default ActiveCourseCard;
