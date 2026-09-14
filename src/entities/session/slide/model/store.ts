import { create } from 'zustand'

import type { Slide } from './types'

type SlidesState = {
    slides: Slide[]
}

export const useSlidesStore = create<SlidesState>(() => ({
    slides: [],
}))
