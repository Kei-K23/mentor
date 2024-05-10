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

const ErrorAlertModal = () => {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={true}>
      <DialogContent isShow={false}>
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image
              src={"/robot-error.png"}
              alt="error image"
              height={100}
              width={100}
            />
          </div>
          <DialogTitle className="text-center text-2xl mb-2">
            Encounter some issues when loading data
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            Please refresh the page again. If error still exist, then back to
            the main page.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              onClick={() => {
                window.location.reload();
              }}
            >
              Refresh the page
            </Button>
            <Button
              variant={"outline"}
              onClick={() => {
                router.push("/learn");
              }}
            >
              Main page
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorAlertModal;
