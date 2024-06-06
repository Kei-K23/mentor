"use client";

import { toggleUserProfileView } from "@/actions/user-action";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

const ProfileHideComponent = () => {
  const [pending, startTransition] = useTransition();
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const toggleRef = useRef<null | HTMLButtonElement>(null);
  const onClick = (value: string) => {
    const isPrivate = value === "true" ? true : false;

    startTransition(() => {
      toggleUserProfileView(isPrivate)
        .then(() => {
          setIsPrivate(isPrivate);
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        ref={toggleRef}
        id="airplane-mode"
        onClick={(e) => {
          onClick(e.currentTarget.ariaChecked!);
        }}
        disabled={pending}
      />
      <Label htmlFor="airplane-mode">
        {isPrivate ? "Private Profile" : "Public Profile"}
      </Label>
    </div>
  );
};

export default ProfileHideComponent;
