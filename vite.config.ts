import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
    plugins: [react()],
    base: mode === 'production' ? '/DCUT-test-1/' : '/',
    resolve: {
        alias: {
            '@': path.resolve(import.meta.dirname, './src'),
        },
    },
}))
