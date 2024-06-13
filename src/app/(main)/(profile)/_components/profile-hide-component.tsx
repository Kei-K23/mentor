"use client";

import { toggleUserProfileView } from "@/actions/user-action";
import { Label } from "@/components/ui/label";

import Switch from "react-switch";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

type ProfileHideComponentProps = {
  privateProfile: boolean;
};

const ProfileHideComponent = ({
  privateProfile,
}: ProfileHideComponentProps) => {
  const [pending, startTransition] = useTransition();
  const [isPrivate, setIsPrivate] = useState<boolean>(privateProfile);

  const handleOnChange = (value: boolean) => {
    startTransition(() => {
      toggleUserProfileView(value)
        .then(() => {
          setIsPrivate(value);
        })
        .catch((e) => {
          console.log(e);

          toast.error("Something went wrong");
        });
    });
  };

  return (
    <div className="flex items-center space-x-2 mb-8">
      <Label htmlFor="airplane-mode">
        {isPrivate ? "Private Profile" : "Public Profile"}
      </Label>
      <Switch
        onChange={(checked) => handleOnChange(checked)}
        disabled={pending}
        checked={isPrivate}
        checkedIcon={false}
        uncheckedIcon={false}
      />
    </div>
  );
};

export default ProfileHideComponent;
