import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Input } from '@/shared/ui/input'
import { cn } from '@/shared/lib'
import { BaseFormField } from './BaseFormField'
import { FormClearButton, FormShowPasswordButton } from './buttons'
import s from './Forms.module.scss'
import { useFormField } from './hooks/useFormField'
import { FormInputProps } from './types/Forms.types'

export const FormInput: React.FC<FormInputProps> = ({
	name,
	label,
	labelStyle,
	required,
	className,
	type = 'text',
	...props
}) => {
	const { control, value, error, onClickClearButton } = useFormField(name)
	const [showPassword, setShowPassword] = useState(false)

	const onClickShowPassword = () => setShowPassword(!showPassword)

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<BaseFormField
					name={name}
					label={label}
					labelStyle={labelStyle}
					required={required}
					className={className}
					error={error}
				>
					<div className={s.formField__inputWrapper}>
						<Input
							type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
							className={cn(s.formField__input, error && s.formField__input__error)}
							{...field}
							{...props}
						/>
						<div className={s.formField__buttons}>
							{value && !props.readOnly && !props.disabled && type !== 'number' && (
								<FormClearButton onClick={onClickClearButton} className={s.formField__clearButton} />
							)}
							{type === 'password' && (
								<FormShowPasswordButton showPassword={showPassword} onClick={onClickShowPassword} />
							)}
						</div>
					</div>
				</BaseFormField>
			)}
		></Controller>
	)
}
