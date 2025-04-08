import { LoginRequest, RegisterRequest, User } from '../api/auth.api.types'

export interface AuthStore {
	user: User | null
	isLoading: boolean
	error: string | null
	isAuthenticated: boolean
	login: (request: LoginRequest) => Promise<boolean>
	register: (request: RegisterRequest) => Promise<boolean>
	logout: () => void
	checkAuth: () => Promise<void>
}
