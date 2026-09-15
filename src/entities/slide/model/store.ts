import { create } from 'zustand'

import { SLIDES_STORAGE_KEY } from '@/shared/config/constants'
import { getStorageJson, setStorageJson } from '@/shared/lib/local-storage'

import { initialSlides } from './initial-data'
import type { Slide } from './types'

type SlidesStore = {
    slides: Slide[]
    addSlide: (slide: Omit<Slide, 'id'>) => void
    updateSlide: (id: string, slide: Omit<Slide, 'id'>) => void
    removeSlide: (id: string) => void
    toggleSlideChecked: (id: string) => void
    initFromStorage: () => void
}

const isSlide = (value: unknown): value is Slide => {
    if (!value || typeof value !== 'object') {
        return false
    }

    const item = value as Record<string, unknown>

    return (
        typeof item.id === 'string' &&
        typeof item.sku === 'string' &&
        typeof item.title === 'string' &&
        typeof item.annotation === 'string' &&
        typeof item.isChecked === 'boolean'
    )
}

const loadSlides = (): Slide[] => {
    const stored = getStorageJson<unknown>(SLIDES_STORAGE_KEY)

    if (!Array.isArray(stored) || stored.length === 0 || !stored.every(isSlide)) {
        return initialSlides
    }

    return stored
}

const persistSlides = (slides: Slide[]): void => {
    setStorageJson(SLIDES_STORAGE_KEY, slides)
}

export const useSlidesStore = create<SlidesStore>((set, get) => ({
    slides: loadSlides(),

    initFromStorage: () => {
        set({ slides: loadSlides() })
    },

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
        persistSlides(get().slides)
    },

    updateSlide: (id, slide) => {
        set((state) => ({
            slides: state.slides.map((item) => (item.id === id ? { ...item, ...slide } : item)),
        }))
        persistSlides(get().slides)
    },

    removeSlide: (id) => {
        set((state) => ({
            slides: state.slides.filter((slide) => slide.id !== id),
        }))
        persistSlides(get().slides)
    },

    toggleSlideChecked: (id) => {
        set((state) => ({
            slides: state.slides.map((slide) =>
                slide.id === id ? { ...slide, isChecked: !slide.isChecked } : slide,
            ),
        }))
        persistSlides(get().slides)
    },
}))
