import { makeAutoObservable } from 'mobx'
import { authApi } from '../api'
import { LoginRequest, RegisterRequest, User } from '../api/auth.api.types'
import { AuthStore } from './auth.store.types'

class AuthStoreImpl implements AuthStore {
	user: User | null = null
	isLoading = false
	error: string | null = null
	isAuthenticated = false

	constructor() {
		makeAutoObservable(this)
		this.checkAuth()
	}

	login = async (request: LoginRequest) => {
		try {
			this.isLoading = true
			this.error = null
			const response = await authApi.login(request)
			localStorage.setItem('token', response.token)
			this.isAuthenticated = true
			const userResponse = await authApi.getCurrentUser()
			this.user = userResponse.user
			return true
		} catch (error) {
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при входе'
			return false
		} finally {
			this.isLoading = false
		}
	}

	register = async (request: RegisterRequest) => {
		try {
			this.isLoading = true
			this.error = null
			const response = await authApi.register(request)
			localStorage.setItem('token', response.token)
			this.isAuthenticated = true

			const userResponse = await authApi.getCurrentUser()
			this.user = userResponse.user

			return true
		} catch (error) {
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при регистрации'
			return false
		} finally {
			this.isLoading = false
		}
	}

	logout = () => {
		localStorage.removeItem('token')
		this.user = null
		this.isAuthenticated = false
	}

	checkAuth = async () => {
		try {
			this.isLoading = true
			const token = localStorage.getItem('token')
			if (token) {
				const userResponse = await authApi.getCurrentUser()
				this.user = userResponse.user
				this.isAuthenticated = true
			}
		} catch (error) {
			this.logout()
		} finally {
			this.isLoading = false
		}
	}
}

export const authStore = new AuthStoreImpl()
