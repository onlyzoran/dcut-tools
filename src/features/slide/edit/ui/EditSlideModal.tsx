import { Button, Group, Modal, Stack, Switch, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'

import { useSlidesStore, type Slide } from '@/entities/slide'

type EditSlideModalProps = {
    opened: boolean
    slide: Slide | null
    onClose: () => void
}

type EditSlideFormValues = {
    sku: string
    title: string
    annotation: string
    isChecked: boolean
}

type EditSlideFormProps = {
    slide: Slide
    onClose: () => void
}

const EditSlideForm = ({ slide, onClose }: EditSlideFormProps) => {
    const updateSlide = useSlidesStore((state) => state.updateSlide)

    const form = useForm<EditSlideFormValues>({
        initialValues: {
            sku: slide.sku,
            title: slide.title,
            annotation: slide.annotation,
            isChecked: slide.isChecked,
        },
        validate: {
            title: (value) => (value.trim().length === 0 ? 'Название обязательно' : null),
        },
    })

    const handleSubmit = form.onSubmit((values) => {
        updateSlide(slide.id, {
            sku: values.sku.trim() || 'NEW-ASSET',
            title: values.title.trim(),
            annotation: values.annotation.trim(),
            isChecked: values.isChecked,
        })
        onClose()
    })

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap="md">
                <TextInput label="Артикул" placeholder="DBRJ1530" {...form.getInputProps('sku')} />
                <TextInput label="Название" placeholder="Название актива" required {...form.getInputProps('title')} />
                <Textarea
                    label="Описание"
                    placeholder="Объект, статус, примечания"
                    minRows={3}
                    {...form.getInputProps('annotation')}
                />
                <Switch label="На объекте" {...form.getInputProps('isChecked', { type: 'checkbox' })} />
                <Group justify="flex-end">
                    <Button variant="default" onClick={onClose}>
                        Отмена
                    </Button>
                    <Button type="submit">Сохранить</Button>
                </Group>
            </Stack>
        </form>
    )
}

export const EditSlideModal = ({ opened, slide, onClose }: EditSlideModalProps) => {
    return (
        <Modal opened={opened} onClose={onClose} title="Редактировать актив" centered>
            {slide ? <EditSlideForm key={slide.id} slide={slide} onClose={onClose} /> : null}
        </Modal>
    )
}
