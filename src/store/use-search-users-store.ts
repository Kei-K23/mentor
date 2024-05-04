'use client'

import { create } from "zustand"

type UseSearchUsersStoreProps = {
    isOpen: boolean,
    open: () => void,
    close: () => void
}

export const useSearchUsersStore = create<UseSearchUsersStoreProps>(set => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));