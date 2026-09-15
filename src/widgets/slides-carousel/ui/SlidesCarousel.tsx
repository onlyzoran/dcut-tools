import { ActionIcon, Badge, Box, Group, Paper, Stack, Switch, Text, Title } from '@mantine/core'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

import { useSlidesStore } from '@/entities/slide'
import { getSlideStatusColor, getSlideStatusLabel } from '@/shared/lib/slide-status'

import classes from './SlidesCarousel.module.css'

export const SlidesCarousel = () => {
    const slides = useSlidesStore((state) => state.slides)
    const toggleSlideChecked = useSlidesStore((state) => state.toggleSlideChecked)
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext()
    }, [emblaApi])

    const scrollTo = useCallback(
        (index: number) => {
            emblaApi?.scrollTo(index)
        },
        [emblaApi],
    )

    const onSelect = useCallback(() => {
        if (!emblaApi) {
            return
        }

        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) {
            return
        }

        setScrollSnaps(emblaApi.scrollSnapList())
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)

        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('reInit', onSelect)
        }
    }, [emblaApi, onSelect])

    if (slides.length === 0) {
        return (
            <Paper withBorder p="xl" radius="md">
                <Text c="dimmed">Активы не найдены</Text>
            </Paper>
        )
    }

    return (
        <Stack gap="md">
            <Box className={classes.viewport} ref={emblaRef}>
                <Box className={classes.container}>
                    {slides.map((slide) => (
                        <Box key={slide.id} className={classes.slide}>
                            <Paper withBorder p="lg" radius="md" h="100%">
                                <Stack gap="sm">
                                    <Group justify="space-between" align="flex-start" wrap="nowrap">
                                        <div>
                                            <Text size="xs" c="dimmed" ff="monospace">
                                                {slide.sku}
                                            </Text>
                                            <Title order={4}>{slide.title}</Title>
                                        </div>
                                        <Badge color={getSlideStatusColor(slide.isChecked)} variant="light">
                                            {getSlideStatusLabel(slide.isChecked)}
                                        </Badge>
                                    </Group>
                                    <Text size="sm" c="dimmed">
                                        {slide.annotation}
                                    </Text>
                                    <Switch
                                        label="На объекте"
                                        checked={slide.isChecked}
                                        onChange={() => toggleSlideChecked(slide.id)}
                                        color="dcut"
                                    />
                                </Stack>
                            </Paper>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Group justify="space-between">
                <Group gap="xs">
                    <ActionIcon variant="default" size="lg" onClick={scrollPrev} aria-label="Previous slide">
                        ←
                    </ActionIcon>
                    <ActionIcon variant="default" size="lg" onClick={scrollNext} aria-label="Next slide">
                        →
                    </ActionIcon>
                </Group>

                <Group gap={6}>
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`${classes.dot} ${index === selectedIndex ? classes.dotActive : ''}`}
                            onClick={() => scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </Group>
            </Group>
        </Stack>
    )
}
