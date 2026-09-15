import { Button, PasswordInput, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router-dom'

import { useSessionStore } from '@/entities/session'

export const LoginForm = () => {
    const navigate = useNavigate()
    const login = useSessionStore((state) => state.login)

    const form = useForm({
        initialValues: { email: '', password: '' },
        validate: {
            email: (value) => (value.trim().length === 0 ? 'Введите email' : null),
            password: (value) => (value.length < 3 ? 'Пароль должен быть не менее 3 символов' : null),
        },
    })

    return (
        <form onSubmit={form.onSubmit((values) => { login(`mock-jwt-${values.email}`); navigate('/') })}>
            <Stack gap="md">
                <TextInput label="Email" placeholder="user@dcut.ru" {...form.getInputProps('email')} />
                <PasswordInput label="Пароль" placeholder="Введите пароль" {...form.getInputProps('password')} />
                <Button type="submit">Войти</Button>
            </Stack>
        </form>
    )
}
