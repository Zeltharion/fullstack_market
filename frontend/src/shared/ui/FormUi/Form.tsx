import { FormProvider } from 'react-hook-form'
import { FormProps } from './types/Forms.types'

export const Form = <T extends object>({ children, ctx, onSubmit, ...props }: FormProps<T>) => {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
		if (e.key === 'Enter') {
			ctx.handleSubmit(onSubmit)()
		}
	}

	return (
		<FormProvider {...ctx}>
			<form onSubmit={ctx.handleSubmit(onSubmit)} onKeyDown={handleKeyDown} {...props}>
				{children}
			</form>
		</FormProvider>
	)
}
