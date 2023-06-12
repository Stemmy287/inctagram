import React, { useEffect, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import s from './Captcha.module.scss'

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

	return (
		<div className={error ? s.error : ''}>
			<ReCAPTCHA
				sitekey='6LeY2y0mAAAAANwI_paCWfoksCgBm1n2z9J0nwNQ'
				onChange={onChangeHandler}
				theme={'dark'}
				hl={'en'}
				ref={captchaRef}
			/>
			{error && <span>Please verify that you are not a robot</span>}
		</div>
	)
}
