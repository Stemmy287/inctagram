import React, { ChangeEvent } from 'react'
import s from './Radio.module.scss'

type PropsType = {
	options: { value: string, title: string , disabled?: boolean}[]
	value: string
	name: string
	onChange: (value: string) => void
}


export const Radio = ({ options, value, name, onChange }: PropsType) => {

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.currentTarget.value)
	}

	return (
		<div className={s.container}>
			{options.map(op =>
				<label key={op.value} className={s.radioWrapper}>
					<input
						className={s.radio}
						type='radio'
						name={name}
						value={op.value}
						checked={value === op.value}
						onChange={onChangeHandler}
						disabled={op.disabled}
					/>
					<span className={s.fake}></span>
					<span className={s.text} aria-disabled={op.disabled}>{op.title}</span>
				</label>
			)}
		</div>
	)
}
