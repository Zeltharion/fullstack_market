import { ReactNode } from 'react'
import { cn } from '@/shared/lib'
import { FormErrorMessage, FormRequiredSymbol } from './feedback'
import s from './Forms.module.scss'

interface BaseFormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
	name: string
	label?: string
	labelStyle?: string
	required?: boolean
	className?: string
	error?: string
	children: ReactNode
}

export const BaseFormField: React.FC<BaseFormFieldProps> = ({
	label,
	labelStyle,
	required,
	className,
	error,
	children,
	...props
}) => {
	return (
		<div className={cn(s.formField, className)} {...props}>
			{label && (
				<p className={labelStyle}>
					{label} {required && <FormRequiredSymbol />}
				</p>
			)}
			{children}
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</div>
	)
}
