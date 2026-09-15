import { Container, Stack, Title } from '@mantine/core'

import { Header } from '@/widgets/header'
import { SlidesCarousel } from '@/widgets/slides-carousel'

export const HomePage = () => {
    return (
        <Stack gap={0}>
            <Header />
            <Container py="xl" size="md">
                <Stack gap="lg">
                    <Title order={2}>Каталог инструментов</Title>
                    <SlidesCarousel />
                </Stack>
            </Container>
        </Stack>
    )
}
