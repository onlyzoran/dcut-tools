import { Button, Container, Group, Stack, Title } from '@mantine/core'
import { useState } from 'react'

import { AddSlideModal } from '@/features/slide/add'
import { AssetsStats } from '@/widgets/assets-stats'
import { Header } from '@/widgets/header'
import { SlidesCarousel } from '@/widgets/slides-carousel'

export const HomePage = () => {
    const [addOpened, setAddOpened] = useState(false)

    return (
        <Stack gap={0} mih="100vh" style={{ maxWidth: '100%', overflowX: 'hidden' }}>
            <Header />
            <Container py={{ base: 'md', sm: 'xl' }} px={{ base: 'md', sm: 'lg' }} size="md" w="100%">
                <Stack gap="lg" w="100%">
                    <Group justify="space-between" align="center" wrap="wrap" gap="sm">
                        <Title order={2} size="h3">
                            Парк активов
                        </Title>
                        <Button
                            w={{ base: '100%', sm: 'auto' }}
                            leftSection={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M12 5v14" />
                                    <path d="M5 12h14" />
                                </svg>
                            }
                            onClick={() => setAddOpened(true)}
                        >
                            Добавить актив
                        </Button>
                    </Group>
                    <AssetsStats />
                    <SlidesCarousel />
                </Stack>
            </Container>

            <AddSlideModal opened={addOpened} onClose={() => setAddOpened(false)} />
        </Stack>
    )
}
