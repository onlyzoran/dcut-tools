import { Button, Container, Group, Stack, Title } from '@mantine/core'
import { useState } from 'react'

import { AddSlideModal } from '@/features/slide/add'
import { DeleteSlideModal } from '@/features/slide/delete'
import { Header } from '@/widgets/header'
import { SlidesCarousel } from '@/widgets/slides-carousel'

export const HomePage = () => {
    const [addOpened, setAddOpened] = useState(false)
    const [deleteOpened, setDeleteOpened] = useState(false)
    const [activeSlideId, setActiveSlideId] = useState<string | null>(null)

    const openDeleteModal = () => {
        if (!activeSlideId) {
            return
        }

        setDeleteOpened(true)
    }

    return (
        <Stack gap={0} mih="100vh">
            <Header />
            <Container py="xl" size="md">
                <Stack gap="lg">
                    <Group justify="space-between" align="flex-end" wrap="wrap">
                        <Title order={2}>Парк активов</Title>
                        <Group>
                            <Button onClick={() => setAddOpened(true)}>Добавить актив</Button>
                            <Button variant="light" color="red" onClick={openDeleteModal} disabled={!activeSlideId}>
                                Удалить актив
                            </Button>
                        </Group>
                    </Group>
                    <SlidesCarousel onActiveSlideChange={setActiveSlideId} />
                </Stack>
            </Container>

            <AddSlideModal opened={addOpened} onClose={() => setAddOpened(false)} />
            <DeleteSlideModal
                opened={deleteOpened}
                slideId={activeSlideId}
                onClose={() => setDeleteOpened(false)}
            />
        </Stack>
    )
}
