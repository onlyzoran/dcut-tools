import { Paper, SimpleGrid, Text, Title } from '@mantine/core'

import { useSlidesStore } from '@/entities/slide'

export const AssetsStats = () => {
    const slides = useSlidesStore((state) => state.slides)
    const onSite = slides.filter((slide) => slide.isChecked).length
    const inStorage = slides.length - onSite

    const stats = [
        { label: 'Всего активов', value: slides.length },
        { label: 'На объекте', value: onSite },
        { label: 'На складе', value: inStorage },
    ]

    return (
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={{ base: 'xs', sm: 'md' }} w="100%">
            {stats.map((stat) => (
                <Paper
                    key={stat.label}
                    withBorder
                    p={{ base: 'sm', sm: 'md' }}
                    radius="md"
                    miw={0}
                    style={{ overflow: 'hidden' }}
                >
                    <Text size="xs" c="dimmed">
                        {stat.label}
                    </Text>
                    <Title order={3} c="dcut.6" size="h4">
                        {stat.value}
                    </Title>
                </Paper>
            ))}
        </SimpleGrid>
    )
}
