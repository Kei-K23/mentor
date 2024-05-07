import { robotoSlab } from "@/app/font";
import { cn } from "@/lib/utils";
import { releaseList } from "@/shared/release-list";
import React from "react";

const ReleaseSection = () => {
  return (
    <div className="max-w-[980px] mx-auto flex flex-col items-center justify-center p-4 my-40">
      <h2
        className={cn(
          "text-center text-xl lg:text-3xl mb-8",
          robotoSlab.className
        )}
      >
        Project release
      </h2>
      <div className="space-y-8">
        {releaseList.map((r) => (
          <div key={r.version} className="border-b last:border-b-0 pb-7">
            <h3 className="text-lg lg:text-2xl font-bold mb-3">
              <b className="text-emerald-500">{r.version}</b>{" "}
              <span className="text-base text-muted-foreground">{r.date}</span>
            </h3>
            <p>{r.description}</p>
            {r.features.length && (
              <div className="mt-4">
                <h2 className="text-lg text-muted-foreground mb-2">
                  Features:
                </h2>
                <div className="flex items-center flex-wrap gap-4">
                  {r.features.map((f) => (
                    <div
                      key={f}
                      className=" p-2 bg-slate-300 dark:bg-slate-700 rounded-lg"
                    >
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReleaseSection;
