import React, { useState } from 'react'
import s from './RecoveryPassword.module.scss'
import { LoginDetailsWrapper } from '@/components/LoginDetailsWrapper/LoginDetailsWrapper'
import { Input } from '@/components/Input/Input'
import { Button } from '@/components/Button/Button'
import Link from 'next/link'
import { Captcha } from '@/components/Captcha/Captcha'
import { Popup } from '@/components/Popup/Popup'
import { TitlePopup } from '@/components/TitlePopup/TitlePopup'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PasswordRecoveryType, useRecoveryPasswordMutation } from '@/modules/authModules'

export const RecoveryPassword = () => {
	const [isActive, setIsActive] = useState(false)

	const [recoveryPassword, { isSuccess }] = useRecoveryPasswordMutation()

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

	const onSubmit: SubmitHandler<PasswordRecoveryType> = data => {
		recoveryPassword(data)
		isSuccess && setIsActive(true)
	}

	const onClosePopupHandler = () => {
		setIsActive(false)
	}

	console.log(errors.recaptcha)
	const onCaptcha = (value: string) => {
		setValue('recaptcha', value)
		setError('recaptcha', { message: '' })
	}

	return (
		<>
			<LoginDetailsWrapper>
				<form className={s.container} onSubmit={handleSubmit(onSubmit)}>
					<h1 className={s.title}>Forgot Password</h1>
					<div>
						<Input title='Email' register={register} name={'email'} error={errors.email?.message || ''} />
						<div className={s.desc}>
							<span>Enter your email address and we will send you further instructions</span>
						</div>
					</div>
					<div className={s.btn}>
						{isSuccess && (
							<span className={s.resend}>
								The link has been sent by email. If you dont receive an email send link again
							</span>
						)}
						<Button title={isSuccess ? 'Send Link Again' : 'Send Link'} callback={() => {}} disabled={!!errors.email} />
					</div>
					<Link className={s.link} href={''}>
						Back to Sign In
					</Link>
					{!isSuccess && <Captcha callback={onCaptcha} error={!!errors.recaptcha?.message} />}
				</form>
			</LoginDetailsWrapper>
			{isActive && (
				<Popup onClose={onClosePopupHandler}>
					<TitlePopup title='Email sent' onClose={onClosePopupHandler} />
					<div className={s.notification}>
						<span>We have sent a link to confirm your email to {getValues().email} </span>
						<div className={s.btn}>
							<Button title='OK' callback={onClosePopupHandler} />
						</div>
					</div>
				</Popup>
			)}
		</>
	)
}
