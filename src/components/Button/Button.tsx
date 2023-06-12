import React, { FC } from 'react'
import s from './Button.module.scss'

type ButtonStyleType = 'opacity' | 'white'

type PropsType = {
	title: string
	callback?: () => void
	disabled?: boolean
	style?: ButtonStyleType
}

export const Button: FC<PropsType> = ({ title, callback, disabled, style }) => {

	const buttonClass = style === 'opacity'
		? `${s.btn} ${s.btnOpacity}`
		: style === 'white' ? `${s.btn} ${s.btnWhite}`
			: s.btn

	return (
		<button
			className={buttonClass}
			disabled={disabled}
			onClick={callback}
		>
			{title}
		</button>
	)
}
