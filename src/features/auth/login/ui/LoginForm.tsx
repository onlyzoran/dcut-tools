import { Button, PasswordInput, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router-dom'

import { useSessionStore } from '@/entities/session'
import { isValidEmail } from '@/shared/lib/validation'

type LoginFormValues = {
    email: string
    password: string
}

export const LoginForm = () => {
    const navigate = useNavigate()
    const login = useSessionStore((state) => state.login)

    const form = useForm<LoginFormValues>({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => {
                if (value.trim().length === 0) {
                    return 'Введите email'
                }

                if (!isValidEmail(value)) {
                    return 'Введите корректный email'
                }

                return null
            },
            password: (value) =>
                value.length < 3 ? 'Пароль должен быть не менее 3 символов' : null,
        },
    })

    const handleSubmit = form.onSubmit((values) => {
        login(`mock-jwt-${values.email.trim()}`)
        navigate('/', { replace: true })
    })

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap="md">
                <TextInput
                    label="Email"
                    placeholder="user@dcut.ru"
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    label="Пароль"
                    placeholder="Введите пароль"
                    {...form.getInputProps('password')}
                />
                <Button type="submit">Войти</Button>
            </Stack>
        </form>
    )
}
