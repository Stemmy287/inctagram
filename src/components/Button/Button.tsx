import React, { FC } from 'react'
import s from './Button.module.scss'

type PropsType = {
	title: string
	callback?: () => void
	disabled?: boolean
	opacity?: boolean
}

export const Button: FC<PropsType> = ({ title, callback, disabled, opacity }) => {
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
