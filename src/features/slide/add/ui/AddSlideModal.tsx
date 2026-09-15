import { Button, Group, Modal, Stack, Switch, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'

import { useSlidesStore } from '@/entities/slide'

type AddSlideModalProps = {
    opened: boolean
    onClose: () => void
}

type AddSlideFormValues = {
    sku: string
    title: string
    annotation: string
    isChecked: boolean
}

export const AddSlideModal = ({ opened, onClose }: AddSlideModalProps) => {
    const addSlide = useSlidesStore((state) => state.addSlide)

    const form = useForm<AddSlideFormValues>({
        initialValues: {
            sku: '',
            title: '',
            annotation: '',
            isChecked: false,
        },
        validate: {
            title: (value) => (value.trim().length === 0 ? 'Название обязательно' : null),
        },
    })

    const handleClose = () => {
        form.reset()
        onClose()
    }

    const handleSubmit = form.onSubmit((values) => {
        addSlide({
            sku: values.sku.trim() || 'NEW-ASSET',
            title: values.title.trim(),
            annotation: values.annotation.trim(),
            isChecked: values.isChecked,
        })
        form.reset()
        onClose()
    })

    return (
        <Modal opened={opened} onClose={handleClose} title="Добавить актив" centered>
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
                        <Button variant="default" onClick={handleClose}>
                            Отмена
                        </Button>
                        <Button type="submit">Добавить</Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    )
}
