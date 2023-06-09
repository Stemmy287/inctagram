import React, { useEffect, useState } from 'react'
import s from './PasswordRecovery.module.scss'
import { LoginDetailsWrapper } from 'components/LoginDetailsWrapper/LoginDetailsWrapper'
import { Input } from 'components/Input/Input'
import { Button } from 'components/Button/Button'
import Link from 'next/link'
import { Captcha } from 'components/Captcha/Captcha'
import { Popup } from 'components/Popup/Popup'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Notification } from 'components/Notification/Notification'
import { PasswordRecoveryType, useRecoveryPasswordMutation } from 'modules/authModules/authApi/authApi'

export const PasswordRecovery = () => {
	const [isActive, setIsActive] = useState(false)
	const [resendLink, setResendLink] = useState(false)

	const [recoveryPassword, { isSuccess, isLoading, reset }] = useRecoveryPasswordMutation()

	const schema = yup.object().shape({
		email: yup.string().email('email should be correct').required('field required'),
		recaptcha: yup.string().required()
	})

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		getValues,
		setError
	} = useForm<PasswordRecoveryType>({
		resolver: yupResolver(schema)
	})
	const onSubmit: SubmitHandler<PasswordRecoveryType> = async data => {
		await recoveryPassword(data)
	}

	const onClosePopupHandler = () => {
		setIsActive(false)
	}
	const onCaptcha = (value: string) => {
		setValue('recaptcha', value)
		setError('recaptcha', { message: '' })
	}

	useEffect(() => {
		if (isSuccess) {
			localStorage.setItem('email', getValues().email)
			!resendLink && setResendLink(true)
			setIsActive(true)
			reset()
		}
	}, [isSuccess])


	return (
		<>
			<LoginDetailsWrapper>
				<form className={s.container} onSubmit={handleSubmit(onSubmit)}>
					<h1 className={s.title}>Forgot Password</h1>
					<div>
						<Input
							title='Email'
							register={register}
							name={'email'}
							error={errors.email?.message || ''}
							disabled={isLoading}
						/>
						<div className={s.desc}>
							<span>Enter your email address and we will send you further instructions</span>
						</div>
					</div>
					<div className={s.btn}>
						{resendLink && (
							<span className={s.resend}>
								The link has been sent by email. If you dont receive an email send link again
							</span>
						)}
						<Button
							title={resendLink ? 'Send Link Again' : 'Send Link'}
							disabled={!!errors.email || isLoading}
						/>
					</div>
					<Link className={s.link} href={'login'}>
						Back to Sign In
					</Link>
					<Captcha callback={onCaptcha} error={!!errors.recaptcha?.message} reset={isSuccess} />
				</form>
			</LoginDetailsWrapper>
			{isActive && (
				<Popup onClose={onClosePopupHandler}>
					<Notification
						title='Email sent'
						buttonTitle='OK'
						message={`We have sent a link to confirm your email to ${getValues().email}`}
						onClose={onClosePopupHandler}
					/>
				</Popup>
			)}
		</>
	)
}
