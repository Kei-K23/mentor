"use client";

import { toggleUserProfileView } from "@/actions/user-action";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

type ProfileHideComponentProps = {
  privateProfile: boolean;
};

const ProfileHideComponent = ({
  privateProfile,
}: ProfileHideComponentProps) => {
  const [pending, startTransition] = useTransition();
  const [isPrivate, setIsPrivate] = useState<boolean>(privateProfile);
  const toggleRef = useRef<null | HTMLButtonElement>(null);
  const [isClient, setIsClient] = useState(false);

  const onClick = (value: string) => {
    const isPrivate = value === "true" ? true : false;
    console.log("here hit", isPrivate);

    startTransition(() => {
      toggleUserProfileView(isPrivate)
        .then(() => {
          setIsPrivate(isPrivate);
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  //! ERROR Here NEED TO HANDLE
  useEffect(() => {
    setIsClient(true);
    if (toggleRef.current) {
      console.log("hre");
      console.log(toggleRef.current.ariaChecked);

      toggleRef.current.ariaChecked = privateProfile ? "false" : "true";
      console.log(toggleRef.current.ariaChecked);
    }
  }, [privateProfile]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        ref={toggleRef}
        id="airplane-mode"
        aria-checked={privateProfile ? "false" : "true"}
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
