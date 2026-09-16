import { Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

import { useSessionStore } from '@/entities/session'

export const LogoutButton = () => {
    const navigate = useNavigate()
    const logout = useSessionStore((state) => state.logout)

    const handleLogout = () => {
        logout()
        navigate('/login', { replace: true })
    }

    return (
        <Button variant="light" color="gray" size="compact-md" onClick={handleLogout}>
            Выйти
        </Button>
    )
}
