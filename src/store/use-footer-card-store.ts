'use client'

import { create } from "zustand"

type UseFooterCardStoreProps = {
    isOpen: boolean,
    open: () => void,
    close: () => void
}

// TODO: need to use localStorage
export const useFooterCardStore = create<UseFooterCardStoreProps>(set => ({
    isOpen: true,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));