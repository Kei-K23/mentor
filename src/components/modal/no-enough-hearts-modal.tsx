"use client";
import React, { useEffect, useState } from "react";

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
import { useNoEnoughHeartsModalStore } from "@/store/use-no-enough-hearts-modal-store";

const NoEnoughHeartsModal = () => {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useNoEnoughHeartsModalStore();

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image
              src={"/depression.png"}
              alt="depression image"
              height={80}
              width={80}
            />
          </div>
          <DialogTitle className="text-center mb-2">
            No enough hearts to continue the challenges!
          </DialogTitle>
          <DialogDescription className="text-center">
            Exchanges your points to refill hearts or reanswer the previous
            solved challenges to gain heart.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              onClick={() => {
                close();
                router.push("/shop");
              }}
            >
              Go to Shop
            </Button>
            <Button
              variant={"outline"}
              onClick={() => {
                close();
              }}
            >
              No Thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NoEnoughHeartsModal;
