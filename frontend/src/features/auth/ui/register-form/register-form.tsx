import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { authStore } from '@/features/auth'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui'
import { Form, FormInput } from '@/shared/ui/FormUi'
import { FormErrorMessage } from '@/shared/ui/FormUi/feedback'
import { RegisterSchema, registerSchema } from './register.schema'

export const RegisterForm = () => {
	const navigate = useNavigate()

	const form = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		mode: 'onChange'
	})

	const { isLoading, register, error } = authStore

	const onSubmit = async (data: RegisterSchema) => {
		try {
			const response = await register(data)
			if (response) {
				navigate('/')
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Card className='min-w-sm'>
			<CardHeader>
				<CardTitle>Регистрация</CardTitle>
				<CardDescription>Введите ваш email и пароль для регистрации в системе</CardDescription>
			</CardHeader>
			<CardContent>
				<Form ctx={form} onSubmit={onSubmit} className='space-y-3'>
					<FormInput placeholder='email@example.com' name='email' type='email' disabled={isLoading} />
					<FormInput placeholder='Имя' name='firstName' disabled={isLoading} />
					<FormInput placeholder='Фамилия' name='lastName' disabled={isLoading} />
					<FormInput placeholder='Пароль' name='password' type='password' disabled={isLoading} />
					<FormInput
						placeholder='Подтвердите пароль'
						name='passwordConfirm'
						type='password'
						disabled={isLoading}
					/>
					{error && <FormErrorMessage>{error}</FormErrorMessage>}
					<Button type='submit' className='w-full' disabled={!form.formState.isValid} loading={isLoading}>
						Зарегистрироваться
					</Button>
				</Form>
			</CardContent>
			<CardFooter className='flex flex-col items-center gap-2'>
				<Link to='/login' className='text-sm'>
					Уже есть аккаунт? Войдите
				</Link>
			</CardFooter>
		</Card>
	)
}
