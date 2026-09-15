import { beforeEach, describe, expect, it } from 'vitest'

import { SLIDES_STORAGE_KEY } from '@/shared/config/constants'

import { useSlidesStore } from './store'

describe('useSlidesStore', () => {
    beforeEach(() => {
        localStorage.clear()
        useSlidesStore.setState({ slides: [] })
    })

    it('addSlide appends asset and persists', () => {
        useSlidesStore.getState().addSlide({
            sku: 'TEST-001',
            title: 'Test asset',
            annotation: 'Demo',
            isChecked: false,
        })

        const { slides } = useSlidesStore.getState()
        expect(slides).toHaveLength(1)
        expect(slides[0]?.title).toBe('Test asset')

        const stored = localStorage.getItem(SLIDES_STORAGE_KEY)
        expect(stored).toContain('Test asset')
    })

    it('removeSlide deletes asset and persists', () => {
        useSlidesStore.getState().addSlide({
            sku: 'TEST-001',
            title: 'To remove',
            annotation: '',
            isChecked: false,
        })

        const id = useSlidesStore.getState().slides[0]?.id
        expect(id).toBeDefined()

        useSlidesStore.getState().removeSlide(id!)

        expect(useSlidesStore.getState().slides).toHaveLength(0)
        expect(localStorage.getItem(SLIDES_STORAGE_KEY)).toContain('[]')
    })

    it('toggleSlideChecked updates isChecked', () => {
        useSlidesStore.getState().addSlide({
            sku: 'TEST-002',
            title: 'Toggle me',
            annotation: '',
            isChecked: false,
        })

        const id = useSlidesStore.getState().slides[0]?.id!
        useSlidesStore.getState().toggleSlideChecked(id)

        expect(useSlidesStore.getState().slides[0]?.isChecked).toBe(true)
    })

    it('updateSlide changes fields and persists', () => {
        useSlidesStore.getState().addSlide({
            sku: 'OLD',
            title: 'Old title',
            annotation: 'Old note',
            isChecked: false,
        })

        const id = useSlidesStore.getState().slides[0]?.id!
        useSlidesStore.getState().updateSlide(id, {
            sku: 'NEW',
            title: 'New title',
            annotation: 'New note',
            isChecked: true,
        })

        const updated = useSlidesStore.getState().slides[0]
        expect(updated?.sku).toBe('NEW')
        expect(updated?.title).toBe('New title')
        expect(updated?.annotation).toBe('New note')
        expect(updated?.isChecked).toBe(true)
        expect(localStorage.getItem(SLIDES_STORAGE_KEY)).toContain('New title')
    })

    it('falls back to initial slides when storage JSON is invalid', () => {
        localStorage.setItem(SLIDES_STORAGE_KEY, '{"broken":true}')
        useSlidesStore.getState().initFromStorage()

        expect(useSlidesStore.getState().slides.length).toBeGreaterThan(0)
        expect(useSlidesStore.getState().slides[0]?.sku).toBeTruthy()
    })
})
