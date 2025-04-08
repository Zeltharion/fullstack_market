import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { authStore } from '@/features/auth'
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Form,
	FormInput
} from '@/shared/ui'
import { FormErrorMessage } from '@/shared/ui/FormUi/feedback'
import { LoginSchema, loginSchema } from './login.schema'

export const LoginForm = () => {
	const navigate = useNavigate()
	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema)
	})

	const { isLoading, login, error } = authStore

	const onSubmit = async (data: LoginSchema) => {
		try {
			const response = await login(data)
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
				<CardTitle>Вход в систему</CardTitle>
				<CardDescription>Введите ваш email и пароль для входа в систему</CardDescription>
			</CardHeader>
			<CardContent>
				<Form ctx={form} onSubmit={onSubmit} className='space-y-3'>
					<FormInput placeholder='email@example.com' name='email' disabled={isLoading} />
					<FormInput placeholder='Пароль' name='password' type='password' disabled={isLoading} />
					{error && <FormErrorMessage>{error}</FormErrorMessage>}
					<Button type='submit' className='w-full' disabled={!form.formState.isValid} loading={isLoading}>
						Войти
					</Button>
				</Form>
			</CardContent>
			<CardFooter className='flex flex-col items-center gap-2'>
				<Link to='/register' className='text-sm'>
					Нет аккаунта? Зарегистрируйтесь
				</Link>
			</CardFooter>
		</Card>
	)
}
