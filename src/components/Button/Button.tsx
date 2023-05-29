import React from 'react'
import s from './Button.module.scss'

type PropsType = {
	title: string
	callback?: () => void
	disabled?: boolean
	white?: boolean
}

export const Button = ({ title, callback, disabled, white }: PropsType) => {
	return (
		<button className={white ? `${s.btn} ${s.whiteBtn}` : s.btn} disabled={disabled} onClick={callback}>
			{title}
		</button>
	)
}
