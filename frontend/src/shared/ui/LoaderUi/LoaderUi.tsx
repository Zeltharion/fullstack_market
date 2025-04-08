import { Loader } from 'lucide-react'
import { cn } from '@/shared/lib'

export function LoaderUi({ className }: { className?: string }) {
	return (
		<div className={cn('flex h-full w-full items-center justify-center', className)}>
			<Loader className='animate-spin text-primary' />
		</div>
	)
}
