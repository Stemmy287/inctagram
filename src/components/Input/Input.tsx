import React, { DetailedHTMLProps, InputHTMLAttributes, useState } from 'react'
import s from './Input.module.scss'
import { UseFormRegister } from 'react-hook-form'
import eyeOff from '/public/icons/eye-off.svg'
import eye from '../../../public/icons/eye-outline.svg'
import Image from 'next/image'

type PropsType = {
	title?: string
	disabled?: boolean
	error?: string
	register: UseFormRegister<any>
	name: string
	password?: boolean
}

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

export const Input = ({ title, disabled, register, name, error, password, ...restProps}: PropsType & DefaultInputPropsType) => {

	const [isShowPassword, setIsShowPassword] = useState(false)

	const onShowPasswordHandler = () => {
		setIsShowPassword(!isShowPassword)
	}

	const eyePassword = isShowPassword
		? <Image className={s.eye} src={eyeOff} alt={'off password'} onClick={onShowPasswordHandler}/>
		: <Image className={s.eye} src={eye} alt={'show password'} onClick={onShowPasswordHandler}/>

	return (
		<div className={s.container}>
			{title && <span className={s.title}>{title}</span>}
			<div className={s.inputWrapper}>
				<input
					className={error ? `${s.input} ${s.errorInput}` : s.input}
					disabled={disabled}
					{...register(name)}
					data-isshowpassword={password && isShowPassword}
					autoComplete={password ? 'off' : 'on'}
				/>
				{password && eyePassword}
			</div>
			{error && <span className={s.error}>{error}</span>}
		</div>
	)
}
