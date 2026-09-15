import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useSessionStore } from '@/entities/session'

type ProtectedRouteProps = {
    children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = useSessionStore((state) => state.token)

    if (!token) {
        return <Navigate to="/login" replace/>
    }

    return children
}
