export interface RegisterRequest {
	email: string
	firstName: string
	lastName: string
	password: string
	passwordConfirm: string
}

export interface LoginRequest {
	email: string
	password: string
}

export interface User {
	email: string
	firstName: string
	lastName: string
	createdAt: string
}

export interface UserResponse {
	user: User
}

export interface RegisterResponse {
	token: string
	user: User
}

export interface TokenResponse {
	token: string
}
