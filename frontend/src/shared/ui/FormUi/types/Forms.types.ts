import { FormHTMLAttributes } from 'react'
import { UseFormReturn } from 'react-hook-form'

export interface BaseFormFieldProps {
	name: string
	label?: string
	labelStyle?: string
	placeholder?: string
	required?: boolean
	className?: string
}

export interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'>, BaseFormFieldProps {}

type FormPropsWithoutSubmit = Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>

export interface FormProps<T extends object> extends FormPropsWithoutSubmit {
	ctx: UseFormReturn<T>
	onSubmit: (data: T) => void | Promise<void>
}
