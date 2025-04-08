import { Repository } from 'typeorm'
import { AppDataSource } from '../config/database'
import { User } from '../entities/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export class AuthService {
	private userRepository: Repository<User>

	constructor() {
		this.userRepository = AppDataSource.getRepository(User)
	}

	async register(
		email: string,
		password: string,
		firstName: string,
		lastName: string
	): Promise<{ user: User; token: string }> {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			throw new Error('Неверный формат email')
		}

		const existingUser = await this.userRepository.findOne({ where: { email } })
		if (existingUser) {
			throw new Error('Пользователь с таким email уже существует')
		}

		if (password.length < 8) {
			throw new Error('Пароль должен содержать минимум 8 символов')
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		const user = this.userRepository.create({
			email,
			password: hashedPassword,
			firstName,
			lastName,
		})

		const savedUser = await this.userRepository.save(user)

		const token = jwt.sign(
			{ userId: savedUser.id },
			process.env.JWT_SECRET || 'your-secret-key',
			{ expiresIn: '24h' }
		)

		return { user: savedUser, token }
	}

	async login(email: string, password: string): Promise<string> {
		const user = await this.userRepository.findOne({ where: { email } })
		if (!user) {
			throw new Error('Пользователь с таким email не найден')
		}

		const isValidPassword = await bcrypt.compare(password, user.password)
		if (!isValidPassword) {
			throw new Error('Неверный пароль')
		}

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
			expiresIn: '24h',
		})

		return token
	}

	async getUserByToken(token: string): Promise<User> {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
				userId: number
			}
			const user = await this.userRepository.findOne({ where: { id: decoded.userId } })
			if (!user) {
				throw new Error('Пользователь с таким email не найден')
			}

			return user
		} catch (error) {
			throw new Error('Сессия недействительна, попробуйте авторизоваться снова')
		}
	}
}
