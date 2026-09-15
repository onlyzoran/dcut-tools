import { Container, Paper, Stack, Title } from '@mantine/core'

import { LoginForm } from '@/features/auth/login'

export const LoginPage = () => {
    return (
        <Container size={420} py="xl">
            <Paper withBorder p="xl" radius="md" shadow="sm">
                <Stack gap="lg">
                    <Title order={2}>Вход</Title>
                    <LoginForm />
                </Stack>
            </Paper>
        </Container>
    )
}
