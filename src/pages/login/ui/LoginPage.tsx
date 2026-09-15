import { Box, Container, Paper, Stack, Text, Title, useComputedColorScheme } from '@mantine/core'

import { LoginForm } from '@/features/auth/login'
import { ThemeToggle } from '@/features/theme/toggle'
import { dcutBrand } from '@/shared/config/theme'

export const LoginPage = () => {
    const colorScheme = useComputedColorScheme('light')

    const background =
        colorScheme === 'dark'
            ? 'linear-gradient(135deg, var(--mantine-color-dark-8) 0%, var(--mantine-color-dark-7) 50%, var(--mantine-color-dark-6) 100%)'
            : `linear-gradient(135deg, ${dcutBrand.gradientStart} 0%, #ffffff 50%, ${dcutBrand.gradientEnd} 100%)`

    return (
        <Box
            mih="100vh"
            style={{
                display: 'flex',
                alignItems: 'center',
                background,
            }}
        >
            <Box pos="absolute" top={16} right={16}>
                <ThemeToggle />
            </Box>
            <Container size={420} py="xl" w="100%">
                <Paper withBorder p="xl" radius="md" shadow="sm">
                    <Stack gap="lg">
                        <div>
                            <Title order={2}>Вход</Title>
                            <Text size="sm" c="dimmed" mt={4}>
                                Система управления парком инструментов DCUT. Любой корректный email и пароль от 3 символов.
                            </Text>
                        </div>
                        <LoginForm />
                    </Stack>
                </Paper>
            </Container>
        </Box>
    )
}
