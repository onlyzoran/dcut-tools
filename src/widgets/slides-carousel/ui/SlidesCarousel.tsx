import { ActionIcon, Badge, Box, Group, Paper, Stack, Switch, Text, Title, Tooltip } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useSlidesStore, type Slide } from '@/entities/slide'
import { DeleteSlideModal } from '@/features/slide/delete'
import { EditSlideModal } from '@/features/slide/edit'
import { getSlideStatusColor, getSlideStatusLabel } from '@/shared/lib/slide-status'

import classes from './SlidesCarousel.module.css'

const PencilIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
)

const TrashIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--mantine-color-red-6)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
    </svg>
)

export const SlidesCarousel = () => {
    const slides = useSlidesStore((state) => state.slides)
    const toggleSlideChecked = useSlidesStore((state) => state.toggleSlideChecked)
    const isDesktop = useMediaQuery('(min-width: 48em)', false, { getInitialValueInEffect: false })
    const slidesToScroll = isDesktop && slides.length > 1 ? 2 : 1
    const slideIdsKey = useMemo(() => slides.map((slide) => slide.id).join('|'), [slides])
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        containScroll: 'trimSnaps',
        slidesToScroll,
    })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)
    const [deleteSlideId, setDeleteSlideId] = useState<string | null>(null)
    const [editSlide, setEditSlide] = useState<Slide | null>(null)

    const syncCarouselState = useCallback(() => {
        if (!emblaApi) {
            return
        }

        setSelectedIndex(emblaApi.selectedScrollSnap())
        setScrollSnaps(emblaApi.scrollSnapList())
        setCanScrollPrev(emblaApi.canScrollPrev())
        setCanScrollNext(emblaApi.canScrollNext())
    }, [emblaApi])

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

    useEffect(() => {
        if (!emblaApi) {
            return
        }

        emblaApi.reInit({
            loop: false,
            align: 'start',
            containScroll: 'trimSnaps',
            slidesToScroll,
        })
        syncCarouselState()
    }, [emblaApi, slideIdsKey, slidesToScroll, syncCarouselState])

    useEffect(() => {
        if (!emblaApi) {
            return
        }

        emblaApi.on('select', syncCarouselState)
        emblaApi.on('reInit', syncCarouselState)

        return () => {
            emblaApi.off('select', syncCarouselState)
            emblaApi.off('reInit', syncCarouselState)
        }
    }, [emblaApi, syncCarouselState])

    useEffect(() => {
        if (!emblaApi) {
            return
        }

        const onResize = () => {
            emblaApi.reInit()
            syncCarouselState()
        }

        window.addEventListener('resize', onResize)

        const root = emblaApi.rootNode().parentElement
        const observer =
            root && typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null

        if (root && observer) {
            observer.observe(root)
        }

        return () => {
            window.removeEventListener('resize', onResize)
            observer?.disconnect()
        }
    }, [emblaApi, syncCarouselState])

    if (slides.length === 0) {
        return (
            <Paper withBorder p="xl" radius="md">
                <Text c="dimmed">Активы не найдены. Добавьте первый актив в парк.</Text>
            </Paper>
        )
    }

    return (
        <>
            <Stack
                gap="md"
                w="100%"
                maw="100%"
                className={`${classes.root} ${slides.length === 1 ? classes.rootSingle : ''}`}
            >
                <Box className={classes.viewport} ref={emblaRef}>
                    <Box className={classes.container}>
                        {slides.map((slide) => (
                            <Box key={slide.id} className={classes.slide}>
                                <Paper
                                    withBorder
                                    p={{ base: 'md', sm: 'lg' }}
                                    radius="md"
                                    className={classes.slideCard}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <Stack gap="sm" className={classes.slideBody}>
                                        <Group justify="space-between" align="flex-start" wrap="wrap" gap="xs">
                                            <Box style={{ flex: 1, minWidth: 0 }}>
                                                <Text size="xs" c="dimmed" ff="monospace">
                                                    {slide.sku}
                                                </Text>
                                                <Title order={4} style={{ overflowWrap: 'anywhere' }}>
                                                    {slide.title}
                                                </Title>
                                            </Box>
                                            <Badge color={getSlideStatusColor(slide.isChecked)} variant="light">
                                                {getSlideStatusLabel(slide.isChecked)}
                                            </Badge>
                                        </Group>
                                        <Text size="sm" c="dimmed" style={{ overflowWrap: 'anywhere' }}>
                                            {slide.annotation}
                                        </Text>
                                        <Group
                                            justify="space-between"
                                            align="center"
                                            wrap="wrap"
                                            gap="sm"
                                            className={classes.slideActions}
                                        >
                                            <Switch
                                                label="На объекте"
                                                checked={slide.isChecked}
                                                onChange={() => toggleSlideChecked(slide.id)}
                                                color="dcut"
                                            />
                                            <Group gap={4} wrap="nowrap">
                                                <Tooltip label="Редактировать">
                                                    <ActionIcon
                                                        variant="subtle"
                                                        color="dcut"
                                                        aria-label="Редактировать актив"
                                                        onClick={() => setEditSlide(slide)}
                                                    >
                                                        <PencilIcon />
                                                    </ActionIcon>
                                                </Tooltip>
                                                <Tooltip label="Удалить">
                                                    <ActionIcon
                                                        variant="subtle"
                                                        color="red"
                                                        aria-label="Удалить актив"
                                                        onClick={() => setDeleteSlideId(slide.id)}
                                                        style={{ color: 'var(--mantine-color-red-6)' }}
                                                    >
                                                        <TrashIcon />
                                                    </ActionIcon>
                                                </Tooltip>
                                            </Group>
                                        </Group>
                                    </Stack>
                                </Paper>
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Group justify="space-between" align="center" className={classes.controls} wrap="nowrap" gap="sm">
                    <Group gap="xs" align="center" wrap="nowrap">
                        <ActionIcon
                            variant="default"
                            size="lg"
                            onClick={scrollPrev}
                            disabled={!canScrollPrev}
                            aria-label="Предыдущие слайды"
                        >
                            ←
                        </ActionIcon>
                        <ActionIcon
                            variant="default"
                            size="lg"
                            onClick={scrollNext}
                            disabled={!canScrollNext}
                            aria-label="Следующие слайды"
                        >
                            →
                        </ActionIcon>
                    </Group>

                    <div className={classes.dots} role="group" aria-label="Навигация по карусели">
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`${classes.dot} ${index === selectedIndex ? classes.dotActive : ''}`}
                                onClick={() => scrollTo(index)}
                                aria-label={`Перейти к группе ${index + 1}`}
                                aria-current={index === selectedIndex ? 'true' : undefined}
                            />
                        ))}
                    </div>
                </Group>
            </Stack>

            <EditSlideModal opened={editSlide !== null} slide={editSlide} onClose={() => setEditSlide(null)} />
            <DeleteSlideModal
                opened={deleteSlideId !== null}
                slideId={deleteSlideId}
                onClose={() => setDeleteSlideId(null)}
            />
        </>
    )
}
