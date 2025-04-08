import axios from 'axios'
import Cookies from 'js-cookie'

function createApi() {
	const api = axios.create({
		baseURL: import.meta.env.VITE_API_URL,
		withCredentials: true
	})

	// Middleware для получения CSRF-токена
	api.interceptors.request.use(async config => {
		// Если это не запрос на получение CSRF-токена
		if (config.url !== '/csrf-token') {
			try {
				// Получаем CSRF-токен
				await api.get('/csrf-token')
				// Получаем токен из куки и устанавливаем в заголовок
				const csrfToken = Cookies.get('csrf')
				if (csrfToken) {
					// Берем первую часть токена до |
					const [token] = csrfToken.split('|')
					config.headers['x-csrf-token'] = token
				}
			} catch (error) {
				console.error('Ошибка при получении CSRF-токена:', error)
			}
		}

		// Добавляем токен авторизации
		const token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}

		return config
	})

	return api
}

export const api = createApi()
