import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './globals.css'
import { ThemeProvider } from './providers/theme-provider'
import { AppRouter } from './router/app-router'

const App = () => {
	return (
		<ThemeProvider defaultTheme='dark'>
			<RouterProvider router={AppRouter} />
		</ThemeProvider>
	)
}

createRoot(document.getElementById('root')!).render(<App />)
