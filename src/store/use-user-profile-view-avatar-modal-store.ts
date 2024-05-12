'use client'

import { UserProfileViewWithViewers } from "@/types";
import { create } from "zustand"

type UseUserProfileViewAvatarModalStoreProps = {
    isOpen: boolean,
    userProfileViews: UserProfileViewWithViewers[],
    open: () => void,
    close: () => void,
    setUserProfileViews: (userProfileViews: UserProfileViewWithViewers[]) => void,
}

export const useUserProfileViewAvatarModalStore = create<UseUserProfileViewAvatarModalStoreProps>(set => ({
    isOpen: false,
    userProfileViews: [],
    setUserProfileViews: (userProfileViews: UserProfileViewWithViewers[]) => set({ userProfileViews: userProfileViews }),
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));