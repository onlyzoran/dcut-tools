import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useSessionStore } from '@/entities/session'

type GuestRouteProps = {
    children: ReactNode
}

export const GuestRoute = ({ children }: GuestRouteProps) => {
    const token = useSessionStore((state) => state.token)

    if (token) {
        return <Navigate to="/" replace />
    }

    return children
}
