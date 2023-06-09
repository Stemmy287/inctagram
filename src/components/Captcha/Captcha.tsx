import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import s from './Captcha.module.scss'

type PropsType = {
	callback: (value: string) => void
	error: boolean
}

export const Captcha = ({ callback, error}: PropsType) => {
	const onChangeHandler = (value: string | null) => {
		callback(value || '')
	}

	return (
		<div className={error ? s.error : ''}>
			<ReCAPTCHA
				sitekey='6LeY2y0mAAAAANwI_paCWfoksCgBm1n2z9J0nwNQ'
				onChange={onChangeHandler}
				theme={'dark'}
				hl={'en'}
			/>
			{error && <span>Please verify that you are not a robot</span>}
		</div>
	)
}
