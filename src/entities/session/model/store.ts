import { create } from 'zustand'

import { AUTH_TOKEN_KEY } from '@/shared/config/constants'
import { removeStorageItem, setStorageItem } from '@/shared/lib/local-storage'

type SessionStore = {
    token: string | null
    login: (token: string) => void
    logout: () => void
    initFromStorage: () => void
}

export const useSessionStore = create<SessionStore>((set) => ({
    token: null,

    login: (token) => {
        setStorageItem(AUTH_TOKEN_KEY, token)
        set({ token })
    },

    logout: () => {
        removeStorageItem(AUTH_TOKEN_KEY)
        set({ token: null })
    },

    initFromStorage: () => {
        const stored = localStorage.getItem(AUTH_TOKEN_KEY)
        set({ token: stored })
    },
}))
