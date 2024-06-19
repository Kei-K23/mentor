import Image from "next/image";
import React from "react";

export default function PrivateImageBanner() {
  return (
    <div className="flex justify-center items-center flex-col mt-12 ">
      <Image
        src={"/question.png"}
        width={100}
        height={100}
        alt="image"
        className="mb-3"
      />
      <p className="text-slate-700 dark:text-slate-400 text-lg">
        This user is preferred to hide the personal information!
      </p>
      <p className="text-slate-700 dark:text-slate-400 ">
        You can view this account when owner public their profile.
      </p>
    </div>
  );
}
