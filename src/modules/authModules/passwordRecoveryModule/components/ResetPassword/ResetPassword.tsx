import React from 'react'
import { useRouter } from 'next/router'
import { LoginDetailsWrapper } from '@/components/LoginDetailsWrapper/LoginDetailsWrapper'
import s from './ResetPassword.module.scss'
import { Input } from '@/components/Input/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ResetPasswordType, useResetPasswordMutation } from '@/modules/authModules'
import { Button } from '@/components/Button/Button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type PropsType = {}

export const ResetPassword = ({}: PropsType) => {
	const router = useRouter()

	const [resetPassword] = useResetPasswordMutation()

	const schema = yup.object().shape({
		newPassword: yup
			.string()
			.min(6, 'Password must be at least 6 characters')
			.max(20, 'Password must be at most 20 characters')
			.required('field required'),
		passwordConfirmation: yup
			.string()
			.min(6, 'Password must be at least 6 characters')
			.max(20, 'Password must be at most 20 characters')
			.oneOf([yup.ref('newPassword')], 'The password must match the new password')
			.required()
	})

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Omit<ResetPasswordType, 'recoveryCode'>>({
		resolver: yupResolver(schema)
	})

	const onSubmit: SubmitHandler<Omit<ResetPasswordType, 'recoveryCode'>> = async data => {
		if (router.query.code) {
			resetPassword({ newPassword: data.newPassword, recoveryCode: router.query.code.toString() })
		}
	}

	return (
		<LoginDetailsWrapper>
			<form className={s.container} onSubmit={handleSubmit(onSubmit)}>
				<h1 className={s.title}>Create New Password</h1>
				<Input
					register={register}
					name='newPassword'
					title='New password'
					error={errors.newPassword?.message}
					password
				/>
				<div>
					<Input
						register={register}
						name='passwordConfirmation'
						title='Password confirmation'
						error={errors.passwordConfirmation?.message}
						password
					/>
					<span className={s.warn}>Your password must be between 6 and 20 characters</span>
				</div>
				<Button title='Create new password' disabled={!!errors.newPassword || !!errors.passwordConfirmation} />
			</form>
		</LoginDetailsWrapper>
	)
}
