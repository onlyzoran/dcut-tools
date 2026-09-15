import { Box, Group, Text, Title } from '@mantine/core'

import { LogoutButton } from '@/features/auth/logout'
import { ThemeToggle } from '@/features/theme/toggle'

export const Header = () => {
    return (
        <Box
            component="header"
            bg="var(--mantine-color-body)"
            style={{ borderBottom: '1px solid var(--mantine-color-default-border)' }}
        >
            <Group
                justify="space-between"
                py={{ base: 'sm', sm: 'md' }}
                px={{ base: 'md', sm: 'lg' }}
                maw={960}
                w="100%"
                mx="auto"
                wrap="nowrap"
                gap="sm"
                style={{ boxSizing: 'border-box' }}
            >
                <div style={{ minWidth: 0 }}>
                    <Title order={3} c="dcut.6" size="h4">
                        DCUT
                    </Title>
                    <Text size="sm" c="dimmed" visibleFrom="sm">
                        Управление парком активов
                    </Text>
                </div>
                <Group gap="xs" wrap="nowrap">
                    <ThemeToggle />
                    <LogoutButton />
                </Group>
            </Group>
        </Box>
    )
}
