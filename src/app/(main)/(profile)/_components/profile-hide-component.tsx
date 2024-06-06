"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";

const ProfileHideComponent = () => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="airplane-mode"
        onClick={(e) => console.log(e.currentTarget.ariaChecked)}
      />
      <Label htmlFor="airplane-mode">Private Profile</Label>
    </div>
  );
};

export default ProfileHideComponent;
