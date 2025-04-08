import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string({ required_error: 'Укажите email' }).email({ message: 'Укажите корректный email' }),
	password: z.string({ required_error: 'Укажите пароль' })
})

export type LoginSchema = z.infer<typeof loginSchema>
