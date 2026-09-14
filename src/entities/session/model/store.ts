import { create } from 'zustand'

import type { SessionState } from './types'

export const useSessionStore = create<SessionState>(() => ({
    token: null,
}))
