import { Button, Group, Modal, Stack, Text } from '@mantine/core'

import { useSlidesStore } from '@/entities/slide'

type DeleteSlideModalProps = {
    opened: boolean
    slideId: string | null
    onClose: () => void
}

export const DeleteSlideModal = ({ opened, slideId, onClose }: DeleteSlideModalProps) => {
    const slides = useSlidesStore((state) => state.slides)
    const removeSlide = useSlidesStore((state) => state.removeSlide)

    const slide = slides.find((item) => item.id === slideId)

    const handleDelete = () => {
        if (!slideId) {
            return
        }

        removeSlide(slideId)
        onClose()
    }

    return (
        <Modal opened={opened} onClose={onClose} title="Удалить актив" centered>
            <Stack gap="lg">
                <Text>
                    Вы уверены, что хотите удалить актив{' '}
                    <Text span fw={600}>
                        {slide?.title ?? 'без названия'}
                    </Text>
                    {slide?.sku ? (
                        <Text span c="dimmed">
                            {' '}
                            ({slide.sku})
                        </Text>
                    ) : null}
                    ?
                </Text>
                <Group justify="flex-end">
                    <Button variant="default" onClick={onClose}>
                        Отмена
                    </Button>
                    <Button color="red" onClick={handleDelete}>
                        Удалить
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )
}
