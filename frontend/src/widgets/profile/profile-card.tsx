import { CalendarIcon, LogOutIcon, MailIcon } from 'lucide-react'
import { authStore } from '@/features/auth/model/auth.store'
import { LoaderUi } from '@/shared/ui'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

export const ProfileCard = () => {
	const { user, logout, isAuthenticated, isLoading, error } = authStore

	if (isLoading) {
		return (
			<Card className='max-w-md'>
				<LoaderUi />
			</Card>
		)
	}

	if (!isAuthenticated || !user || error) {
		return null
	}

	return (
		<Card className='min-w-[300px] w-full'>
			<CardHeader>
				<CardTitle className='flex justify-between items-center'>
					{user.firstName} {user.lastName}
					<Button onClick={logout} variant='destructive' size='icon'>
						<LogOutIcon className='w-4 h-4' />
					</Button>
				</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-col gap-1'>
				<div className='flex items-center gap-2'>
					<MailIcon className='w-4 h-4' />
					<p className='text-sm text-muted-foreground'>{user.email}</p>
				</div>
				<div className='flex items-center gap-2'>
					<CalendarIcon className='w-4 h-4' />
					<p className='text-sm text-muted-foreground'>{user.createdAt}</p>
				</div>
			</CardContent>
		</Card>
	)
}
