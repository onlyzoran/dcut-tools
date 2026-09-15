import { create } from 'zustand'

import { initialSlides } from './initial-data.ts'
import type { Slide } from './types.ts'

type SlidesStore = {
    slides: Slide[]
    addSlide: (slide: Omit<Slide, 'id'>) => void
    removeSlide: (id: string) => void
    toggleSlideChecked: (id: string) => void
}

export const useSlidesStore = create<SlidesStore>((set) => ({
    slides: initialSlides,

    addSlide: (slide) => {
        set((state) => ({
            slides: [
                ...state.slides,
                {
                    ...slide,
                    id: crypto.randomUUID(),
                },
            ],
        }))
    },

    removeSlide: (id) => {
        set((state) => ({
            slides: state.slides.filter((slide) => slide.id !== id),
        }))
    },

    toggleSlideChecked: (id) => {
        set((state) => ({
            slides: state.slides.map((slide) =>
                slide.id === id ? { ...slide, isChecked: !slide.isChecked } : slide,
            ),
        }))
    },
}))
