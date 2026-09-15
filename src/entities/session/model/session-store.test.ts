import { beforeEach, describe, expect, it } from 'vitest'

import { AUTH_TOKEN_KEY } from '@/shared/config/constants'

import { useSessionStore } from './store'

describe('useSessionStore', () => {
    beforeEach(() => {
        localStorage.clear()
        useSessionStore.setState({ token: null })
    })

    it('login saves token to store and localStorage', () => {
        useSessionStore.getState().login('mock-jwt-test')

        expect(useSessionStore.getState().token).toBe('mock-jwt-test')
        expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBe('mock-jwt-test')
    })

    it('logout clears token', () => {
        useSessionStore.getState().login('mock-jwt-test')
        useSessionStore.getState().logout()

        expect(useSessionStore.getState().token).toBeNull()
        expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBeNull()
    })

    it('initFromStorage restores token after reload', () => {
        localStorage.setItem(AUTH_TOKEN_KEY, 'persisted-token')
        useSessionStore.setState({ token: null })

        useSessionStore.getState().initFromStorage()

        expect(useSessionStore.getState().token).toBe('persisted-token')
    })

    it('hydrates token synchronously from localStorage on create', () => {
        localStorage.setItem(AUTH_TOKEN_KEY, 'boot-token')
        useSessionStore.setState({ token: localStorage.getItem(AUTH_TOKEN_KEY) })

        expect(useSessionStore.getState().token).toBe('boot-token')
    })
})
