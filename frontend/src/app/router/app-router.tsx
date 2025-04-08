import { createBrowserRouter, Navigate } from 'react-router-dom'
import { HomePage, LoginPage, RegisterPage } from '@/pages'
import { PrivateRoute } from './private-route'

export const AppRouter = createBrowserRouter([
	{
		path: '/',
		element: (
			<PrivateRoute>
				<HomePage />
			</PrivateRoute>
		)
	},
	{
		path: '/login',
		element: <LoginPage />
	},
	{
		path: '/register',
		element: <RegisterPage />
	},
	{
		path: '*',
		element: <Navigate to='/' />
	}
])
