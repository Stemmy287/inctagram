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
import { en } from '../../../../../locales/en'
import { ru } from '../../../../../locales/ru'
import { useRouter } from 'next/router'

export const PasswordRecovery = () => {
	const [isActive, setIsActive] = useState(false)
	const [resendLink, setResendLink] = useState(false)

	const [recoveryPassword, { isSuccess, isLoading, reset }] = useRecoveryPasswordMutation()

	const schema = yup.object().shape({
		email: yup.string().email('email should be correct').required('field required'),
		recaptcha: yup.string().required()
	})

	const router = useRouter()

	const t = router.locale === 'en' ? en : ru

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
					<h1 className={s.title}>{t.forgotPasswordTitle}</h1>
					<div>
						<Input
							title={t.email}
							register={register}
							name={'email'}
							error={errors.email?.message || ''}
							disabled={isLoading}
						/>
						<div className={s.desc}>
							<span>{t.instructions}</span>
						</div>
					</div>
					<div className={s.btn}>
						{resendLink && (
							<span className={s.resend}>
								{t.linkHasBeenSent}
							</span>
						)}
						<Button
							title={resendLink ? t.sendLinkAgain : t.sendLink}
							disabled={!!errors.email || isLoading}
						/>
					</div>
					<Link className={s.link} href={'login'}>
						{t.backToSignIn}
					</Link>
					<Captcha callback={onCaptcha} error={!!errors.recaptcha?.message} reset={isSuccess} />
				</form>
			</LoginDetailsWrapper>
			{isActive && (
				<Popup onClose={onClosePopupHandler}>
					<Notification
						title={t.emailSent}
						buttonTitle={t.ok}
						message={`${t.emailConfirm} ${getValues().email}`}
						onClose={onClosePopupHandler}
					/>
				</Popup>
			)}
		</>
	)
}
