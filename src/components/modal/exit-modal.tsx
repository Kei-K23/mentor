"use client";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../ui/button";
import { useExitModalStore } from "@/store/use-exit-modal-store";

const ExitModal = () => {
  const router = useRouter();

  const { isOpen, close } = useExitModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image src={"/cry.png"} alt="cyr image" height={80} width={80} />
          </div>
          <DialogTitle className="text-center mb-2">
            Just try with me!
          </DialogTitle>
          <DialogDescription className="text-center">
            You&apos;ve about to leave the challenge. Are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button onClick={close}>Keep challenging</Button>
            <Button
              variant={"ghost"}
              onClick={() => {
                router.push("/learn");
                close();
              }}
            >
              Leave
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExitModal;
