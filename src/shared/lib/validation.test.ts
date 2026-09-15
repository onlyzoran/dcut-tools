import { describe, expect, it } from 'vitest'

import { isValidEmail } from './validation'

describe('isValidEmail', () => {
    it('accepts valid email', () => {
        expect(isValidEmail('user@example.com')).toBe(true)
    })

    it('rejects email without domain', () => {
        expect(isValidEmail('user@')).toBe(false)
    })

    it('rejects plain string', () => {
        expect(isValidEmail('not-an-email')).toBe(false)
    })

    it('trims whitespace before validation', () => {
        expect(isValidEmail('  user@example.com  ')).toBe(true)
    })
})
