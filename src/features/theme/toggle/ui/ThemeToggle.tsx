import { ActionIcon, Tooltip, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
)

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
)

export const ThemeToggle = () => {
    const { setColorScheme } = useMantineColorScheme()
    const colorScheme = useComputedColorScheme('light')
    const isLight = colorScheme === 'light'

    const toggleTheme = () => {
        setColorScheme(isLight ? 'dark' : 'light')
    }

    return (
        <Tooltip label={isLight ? 'Тёмная тема' : 'Светлая тема'}>
            <ActionIcon variant="subtle" color="dcut" aria-label={isLight ? 'Включить тёмную тему' : 'Включить светлую тему'} onClick={toggleTheme}>
                {isLight ? <MoonIcon /> : <SunIcon />}
            </ActionIcon>
        </Tooltip>
    )
}
