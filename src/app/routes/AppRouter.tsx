import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/login'

import { GuestRoute } from './GuestRoute'
import { ProtectedRoute } from './ProtectedRoute'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export const AppRouter = () => {
    return (
        <BrowserRouter basename={basename}>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <GuestRoute>
                            <LoginPage />
                        </GuestRoute>
                    }
                />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}
