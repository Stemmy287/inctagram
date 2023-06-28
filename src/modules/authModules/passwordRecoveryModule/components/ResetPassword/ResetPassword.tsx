import React from 'react'
import { useRouter } from 'next/router'
import { LoginDetailsWrapper } from 'components/LoginDetailsWrapper/LoginDetailsWrapper'
import s from './ResetPassword.module.scss'
import { Input } from 'components/Input/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from 'components/Button/Button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ResetPasswordType, useResetPasswordMutation } from 'modules/authModules/authApi/authApi'
import { en } from '../../../../../locales/en'
import { ru } from '../../../../../locales/ru'

export const ResetPassword = () => {
	const router = useRouter()

	const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation()

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

	const t = router.locale === 'en' ? en : ru

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

	if (isSuccess) {
		router.push('login')
	}

	return (
		<LoginDetailsWrapper>
			<form className={s.container} onSubmit={handleSubmit(onSubmit)}>
				<h1 className={s.title}>{t.createNewPassword}</h1>
				<Input
					register={register}
					name='newPassword'
					title={t.newPassword}
					error={errors.newPassword?.message}
					disabled={isLoading}
					password
				/>
				<div>
					<Input
						register={register}
						name='passwordConfirmation'
						title={t.passwordConfirmation}
						error={errors.passwordConfirmation?.message}
						disabled={isLoading}
						password
					/>
					<span className={s.warn}>{t.passwordCharacters}</span>
				</div>
				<Button
					title={t.createNewPasswordButton}
					disabled={!!errors.newPassword || !!errors.passwordConfirmation || isLoading}
				/>
			</form>
		</LoginDetailsWrapper>
	)
}
