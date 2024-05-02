"use client";

import { createUserBio } from "@/actions/user-action";
import { Input } from "@/components/ui/input";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

type BioFormProps = {
  initialBio: string;
};

const BioForm = ({ initialBio }: BioFormProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [pending, startTransition] = useTransition();
  const [bio, setBio] = useState(initialBio ?? "");

  const createBio = (bio: string) => {
    startTransition(() => {
      createUserBio(bio)
        .then(() => {
          toast.success("Updated bio successfully");
        })
        .catch((e) => toast.error(e.message));
      setIsEdit(false);
    });
  };

  return (
    <div className="">
      {isEdit ? (
        <Input
          onBlur={() => createBio(bio)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createBio(bio);
            }
          }}
          disabled={pending}
          placeholder="write your bio"
          value={bio}
          autoFocus
          onChange={(e) => setBio(e.target.value)}
        />
      ) : (
        <p
          className="text-muted-foreground text-center text-lg"
          onClick={() => setIsEdit(true)}
        >
          {bio === "" ? "No bio provide" : bio}
        </p>
      )}
    </div>
  );
};

export default BioForm;
