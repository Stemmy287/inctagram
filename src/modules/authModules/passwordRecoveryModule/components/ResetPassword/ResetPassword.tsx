import React from 'react'
import { useRouter } from 'next/router'
import { LoginDetailsWrapper } from '@/components/LoginDetailsWrapper/LoginDetailsWrapper'
import s from './ResetPassword.module.scss'
import { Input } from '@/components/Input/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ResetPasswordType } from '@/modules/authModules'
import { Simulate } from 'react-dom/test-utils'
import { Button } from '@/components/Button/Button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type PropsType = {}

export const ResetPassword = ({}: PropsType) => {

	const router = useRouter()

	const schema = yup.object().shape({
		password: yup.string().required('field required'),
		passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'The password must match the new password')
	})

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<ResetPasswordType>({
		resolver: yupResolver(schema)
	})

	const onSubmit: SubmitHandler<ResetPasswordType> = async data => {
		console.log(data)
	}

	return (
		<LoginDetailsWrapper>
			<form className={s.container} onSubmit={handleSubmit(onSubmit)}>
				<h1 className={s.title}>Create New Password</h1>
				<Input register={register} name='password' title='password' error={errors.password?.message} />
				<div>
					<Input
						register={register}
						name='passwordConfirmation'
						title='passwordConfirmation'
						error={errors.passwordConfirmation?.message}
					/>
					<span className={s.warn}>Your password must be between 6 and 20 characters</span>
				</div>
				<Button title='Create new password' disabled={!!errors.password || !!errors.passwordConfirmation}/>
			</form>
		</LoginDetailsWrapper>
	)
}
