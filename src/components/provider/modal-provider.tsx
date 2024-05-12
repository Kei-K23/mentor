"use client";

import React, { useEffect, useState } from "react";
import ExitModal from "../modal/exit-modal";
import NoEnoughHeartsModal from "../modal/no-enough-hearts-modal";
import SearchUserModal from "../modal/search-users-modal";
import ProfileViewAvatarModal from "../modal/profile-view-avatar-modal";

const ModalProvider = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return null;
  }
  return (
    <>
      <ExitModal />
      <NoEnoughHeartsModal />
      <SearchUserModal />
      <ProfileViewAvatarModal />
    </>
  );
};

export default ModalProvider;
