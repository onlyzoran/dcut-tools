import { useEffect, type ReactNode } from 'react'

import { useSessionStore } from '@/entities/session'
import { useSlidesStore } from '@/entities/slide'

type SessionProviderProps = {
    children: ReactNode
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
    const initSession = useSessionStore((state) => state.initFromStorage)
    const initSlides = useSlidesStore((state) => state.initFromStorage)

    useEffect(() => {
        initSession()
        initSlides()
    }, [initSession, initSlides])

    return children
}
