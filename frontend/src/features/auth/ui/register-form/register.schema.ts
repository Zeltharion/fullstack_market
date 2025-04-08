import { z } from 'zod'

export const registerSchema = z
	.object({
		email: z.string({ required_error: 'Укажите email' }).email({ message: 'Укажите корректный email' }),
		password: z.string({ required_error: 'Укажите пароль' }),
		firstName: z.string({ required_error: 'Укажите имя' }).min(2, { message: 'Имя должно быть более 2х символов' }),
		lastName: z
			.string({ required_error: 'Укажите фамилию' })
			.min(2, { message: 'Фамилия должна быть более 2х символов' }),
		passwordConfirm: z.string({ required_error: 'Подтвердите пароль' })
	})
	.refine(data => data.password === data.passwordConfirm, {
		message: 'Пароли не совпадают',
		path: ['passwordConfirm']
	})

export type RegisterSchema = z.infer<typeof registerSchema>
