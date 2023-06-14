import React, { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'
import s from './TextArea.module.scss'
import { UseFormRegister } from 'react-hook-form'

type PropsType = {
	title?: string
	register: UseFormRegister<any>
	error?: string
}

type DefaultTextAreaPropsType = DetailedHTMLProps<
	TextareaHTMLAttributes<HTMLTextAreaElement>,
	HTMLTextAreaElement
>

export const TextArea = ({title, register, error, ...restProps}: PropsType & DefaultTextAreaPropsType) => {
	return (
		<div className={s.container}>
			{title && <span className={s.title}>{title}</span>}
			<textarea
				className={error ? `${s.textarea} ${s.textareaError}` : s.textarea}
				{...register(restProps.name || '')}
			/>
			{error && <span className={s.error}>{error}</span>}
		</div>
	)
}

