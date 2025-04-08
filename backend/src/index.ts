import express from 'express'
import router from './routes'
import { AppDataSource } from './config/database'
import {
	corsMiddleware,
	cookieMiddleware,
	csrfMiddleware,
	jsonMiddleware,
	notFoundMiddleware,
	errorHandler,
	generateCsrfToken,
} from './middleware'

const app = express()
const port = process.env.PORT || 3000

// Основные middleware
app.use(corsMiddleware)
app.use(cookieMiddleware)
app.use(jsonMiddleware)

// CSRF защита
app.get('/api/csrf-token', (req, res) => {
	res.json({ token: generateCsrfToken(req, res) })
})

// Применяем CSRF защиту ко всем роутам кроме /api/csrf-token
app.use('/api', (req, res, next) => {
	if (req.path === '/csrf-token') {
		return next()
	}
	csrfMiddleware(req, res, next)
})

// Роуты
app.use('/api', router)

// Обработка ошибок
app.use(notFoundMiddleware)
app.use(errorHandler)

AppDataSource.initialize()
	.then(() => {
		console.log('Data Source has been initialized!')
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`)
		})
	})
	.catch((error: Error) => console.log('Error during Data Source initialization:', error))
