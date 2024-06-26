"use client";

import { createUserBio } from "@/actions/user-action";
import ActionTooltip from "@/components/action-tooltip";
import { Input } from "@/components/ui/input";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

type BioFormProps = {
  initialBio: string;
  notEditable?: boolean;
};

const BioForm = ({ initialBio, notEditable = false }: BioFormProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [pending, startTransition] = useTransition();
  const [bio, setBio] = useState(initialBio ?? "");

  const createBio = (bio: string) => {
    if (bio === "") return;

    if (notEditable) return;

    if (initialBio === bio) {
      return setIsEdit(false);
    }

    startTransition(() => {
      createUserBio(bio)
        .then(() => {
          toast.success("Updated bio successfully");
        })
        .catch((e) => toast.error(e));
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
        <ActionTooltip text="Click to update the bio" side="right">
          <p
            className="text-muted-foreground text-center text-lg"
            onClick={() => {
              if (notEditable) return;
              setIsEdit(true);
            }}
          >
            {bio === "" ? "This user is not provide bio." : bio}
          </p>
        </ActionTooltip>
      )}
    </div>
  );
};

export default BioForm;
