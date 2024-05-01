'use client'

import { create } from "zustand"

type UseNoEnoughHeartsModalStoreProps = {
    isOpen: boolean,
    open: () => void,
    close: () => void
}

export const useNoEnoughHeartsModalStore = create<UseNoEnoughHeartsModalStoreProps>(set => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));