import { MantineProvider, createTheme } from '@mantine/core'
import type { ReactNode } from 'react'

import { dcutColors } from '@/shared/config/theme'

import '@mantine/core/styles.css'

import { SessionProvider } from './SessionProvider'

const theme = createTheme({
    primaryColor: 'dcut',
    colors: {
        dcut: dcutColors,
    },
    fontFamily: 'Inter, system-ui, sans-serif',
    headings: {
        fontFamily: 'Inter, system-ui, sans-serif',
    },
})

type AppProviderProps = {
    children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <MantineProvider theme={theme} defaultColorScheme="light">
            <SessionProvider>{children}</SessionProvider>
        </MantineProvider>
    )
}
