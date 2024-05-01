'use client'

import { create } from "zustand"

type UseExitModalStoreProps = {
    isOpen: boolean,
    open: () => void,
    close: () => void
}

export const useExitModalStore = create<UseExitModalStoreProps>(set => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));