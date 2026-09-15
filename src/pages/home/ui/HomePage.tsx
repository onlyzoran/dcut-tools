import { Button, Container, Group, Stack, Title } from '@mantine/core'
import { useState } from 'react'

import { AddSlideModal } from '@/features/slide/add'
import { DeleteSlideModal } from '@/features/slide/delete'
import { useSlidesStore } from '@/entities/slide'
import { Header } from '@/widgets/header'
import { SlidesCarousel } from '@/widgets/slides-carousel'

export const HomePage = () => {
    const slides = useSlidesStore((state) => state.slides)
    const [addOpened, setAddOpened] = useState(false)
    const [deleteOpened, setDeleteOpened] = useState(false)
    const [selectedSlideId, setSelectedSlideId] = useState<string | null>(null)

    const currentSlideId = slides[0]?.id ?? null

    const openDeleteModal = () => {
        setSelectedSlideId(currentSlideId)
        setDeleteOpened(true)
    }

    return (
        <Stack gap={0}>
            <Header />
            <Container py="xl" size="md">
                <Stack gap="lg">
                    <Group justify="space-between">
                        <Title order={2}>Каталог инструментов</Title>
                        <Group>
                            <Button onClick={() => setAddOpened(true)}>Добавить</Button>
                            <Button variant="light" color="red" onClick={openDeleteModal} disabled={!currentSlideId}>
                                Удалить
                            </Button>
                        </Group>
                    </Group>
                    <SlidesCarousel />
                </Stack>
            </Container>

            <AddSlideModal opened={addOpened} onClose={() => setAddOpened(false)} />
            <DeleteSlideModal
                opened={deleteOpened}
                slideId={selectedSlideId}
                onClose={() => setDeleteOpened(false)}
            />
        </Stack>
    )
}
