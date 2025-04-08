import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { authStore } from '@/features/auth/model/auth.store'
import { LoaderUi } from '@/shared/ui'

interface PrivateRouteProps {
	children: React.ReactNode
}

export const PrivateRoute = observer(({ children }: PrivateRouteProps) => {
	const location = useLocation()

	useEffect(() => {
		if (!authStore.isAuthenticated) {
			authStore.checkAuth()
		}
	}, [])

	if (authStore.isLoading) {
		return <LoaderUi />
	}

	if (!authStore.isAuthenticated) {
		return <Navigate to='/login' state={{ from: location }} replace />
	}

	return <>{children}</>
})
