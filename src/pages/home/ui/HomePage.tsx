import { Container, Stack, Title } from '@mantine/core'

import { Header } from '@/widgets/header'

export const HomePage = () => {
    return (
        <Stack gap={0}>
            <Header />
            <Container py="xl">
                <Title order={2}>Главная</Title>
            </Container>
        </Stack>
    )
}
