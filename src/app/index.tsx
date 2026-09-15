import { AppProvider } from './providers/AppProvider'
import { AppRouter } from './routes/AppRouter'

export const App = () => {
    return (
        <AppProvider>
            <AppRouter />
        </AppProvider>
    )
}
