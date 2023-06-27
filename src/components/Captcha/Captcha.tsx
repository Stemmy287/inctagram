import React, { useEffect, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import s from './Captcha.module.scss'
import { useRouter } from 'next/router'
import { en } from '../../locales/en'
import { ru } from '../../locales/ru'

type PropsType = {
	callback: (value: string) => void
	error: boolean
	reset?: boolean
}

export const Captcha = ({ callback, error, reset}: PropsType) => {
	const onChangeHandler = (value: string | null) => {
		callback(value || '')
	}

	const captchaRef = useRef<ReCAPTCHA>(null)

	useEffect(() => {
		if (reset) {
			captchaRef.current?.reset()
		}
	}, [reset])

	const router = useRouter()

	return (
		<div className={error ? s.error : ''}>
			<ReCAPTCHA
				sitekey='6LeY2y0mAAAAANwI_paCWfoksCgBm1n2z9J0nwNQ'
				onChange={onChangeHandler}
				theme={'dark'}
				hl={router.locale === 'en' ? 'en' : 'ru'}
				ref={captchaRef}
			/>
			{error && <span>Please verify that you are not a robot</span>}
		</div>
	)
}
