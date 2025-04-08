import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { api } from '@/shared/api/axios'
import { authApiRoutes } from './auth.api.routes'
import { LoginRequest, RegisterRequest, RegisterResponse, TokenResponse, UserResponse } from './auth.api.types'

export const authApi = {
	register: async (request: RegisterRequest): Promise<RegisterResponse> => {
		const { data } = await api.post<RegisterResponse>(authApiRoutes.register, request)
		localStorage.setItem('token', data.token)
		return data
	},
	login: async (request: LoginRequest): Promise<TokenResponse> => {
		const { data } = await api.post<TokenResponse>(authApiRoutes.login, request)
		localStorage.setItem('token', data.token)
		return data
	},
	logout: async (): Promise<void> => {
		const { data } = await api.post<void>(authApiRoutes.logout)
		localStorage.removeItem('token')
		return data
	},
	getCurrentUser: async (): Promise<UserResponse> => {
		const { data } = await api.get<UserResponse>(authApiRoutes.getCurrentUser)
		return {
			user: {
				...data.user,
				createdAt: format(new Date(data.user.createdAt), 'd MMMM yyyy, HH:mm', { locale: ru })
			}
		}
	}
}
