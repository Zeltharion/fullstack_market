import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'

export class AuthController {
	private authService: AuthService

	constructor() {
		this.authService = new AuthService()
	}

	async register(req: Request, res: Response): Promise<void> {
		try {
			const { email, password, passwordConfirm, firstName, lastName } = req.body

			if (!email || !password || !passwordConfirm || !firstName || !lastName) {
				res.status(400).json({
					status: 400,
					error: 'Все поля обязательны для заполнения',
				})
				return
			}

			if (password !== passwordConfirm) {
				res.status(400).json({
					status: 400,
					error: 'Пароли не совпадают',
				})
				return
			}

			const { user, token } = await this.authService.register(
				email,
				password,
				firstName,
				lastName
			)

			const userResponse = {
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
			}

			res.status(201).json({
				token,
				user: userResponse,
				message: 'ok',
			})
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(400).json({
					status: 400,
					error: error.message,
				})
			} else {
				res.status(400).json({
					status: 400,
					error: 'Неизвестная ошибка',
				})
			}
		}
	}

	async login(req: Request, res: Response): Promise<void> {
		try {
			const { email, password } = req.body
			const token = await this.authService.login(email, password)
			res.json({ token })
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(401).json({
					status: 401,
					error: error.message,
				})
			} else {
				res.status(401).json({
					status: 401,
					error: 'Неизвестная ошибка',
				})
			}
		}
	}

	async logout(req: Request, res: Response): Promise<void> {
		try {
			res.status(200).json({
				message: 'Успешный выход из системы',
			})
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(500).json({
					status: 500,
					error: error.message,
				})
			} else {
				res.status(500).json({
					status: 500,
					error: 'Неизвестная ошибка',
				})
			}
		}
	}

	async getCurrentUser(req: Request, res: Response): Promise<void> {
		try {
			const token = req.headers.authorization?.split(' ')[1]
			if (!token) {
				res.status(401).json({
					status: 401,
					error: 'Токен не предоставлен',
				})
				return
			}
			const user = await this.authService.getUserByToken(token)

			const userResponse = {
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				createdAt: user.createdAt,
			}

			res.json({ user: userResponse })
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(401).json({
					status: 401,
					error: error.message,
				})
			} else {
				res.status(401).json({
					status: 401,
					error: 'Неизвестная ошибка',
				})
			}
		}
	}
}
