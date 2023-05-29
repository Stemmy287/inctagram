import React from 'react'
import s from './Button.module.scss'

type PropsType = {
	title: string
	callback?: () => void
	disabled?: boolean
	opacity?: boolean
}

export const Button = ({ title, callback, disabled, opacity }: PropsType) => {
	return (
		<button
			className={opacity ? s.btn + ' ' + s.btnOpacity : s.btn}
			disabled={disabled}
			onClick={callback}
		>
			{title}
		</button>
	)
}
