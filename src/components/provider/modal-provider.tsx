"use client";

import React, { useEffect, useState } from "react";
import ExitModal from "../modal/exit-modal";

const ModalProvider = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return null;
  }
  return (
    <>
      <ExitModal />
    </>
  );
};

export default ModalProvider;
