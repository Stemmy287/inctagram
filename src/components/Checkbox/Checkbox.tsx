import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import s from './Checkbox.module.scss'

type PropsType = {
	title?: string
	disabled?: boolean
}

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement>

export const Checkbox = ({title, disabled, ...restPros}: PropsType & DefaultInputPropsType) => {

	return (
		<div className={s.container}>
			<label className={s.label} aria-disabled={disabled}>
				<div className={s.checkboxWrapper}>
					<input className={s.checkbox} type='checkbox' disabled={disabled} {...restPros}/>
					<span className={s.fake}></span>
				</div>
				{title && <span className={s.title} aria-disabled={disabled}>{title}</span>}
			</label>
		</div>

	)
}

