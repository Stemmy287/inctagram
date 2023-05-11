import googleLogo from '/public/icons/googleSvg.svg'
import githubLogo from '/public/icons/githubSvg.svg'
import eyeOn from '/public/icons/eye.svg'
import s from '@/styles/Login.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/Button/Button'
import { Input } from '@/components/Input/Input'
import { LoginDetailsWrapper } from '@/components/LoginDetailsWrapper/LoginDetailsWrapper'
import { NextPageWithLayout } from '@/pages/_app'

import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useLoginMutation } from '@/modules/authModules'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/assets/hooks/useAppSelector'
import { loggedIn } from '@/modules/authReducer/auth.selectors'
import { LoginFormData } from '@/modules/authModules/api/auth.api'

const Login: NextPageWithLayout = () => {

	const [login] = useLoginMutation()

	const isLoggedIn = useAppSelector(loggedIn)

	const router = useRouter()

	if (isLoggedIn) {
		router.push('/profile')
	}

	const [passwordShown, setPasswordShown] = useState(false)
	const togglePasswordVisiblity = () => {
		setPasswordShown(!passwordShown)
	}

	const schema = yup.object().shape({
		email: yup.string().email('email should be correct').required('field required'),
		password: yup.string().required('enter password')
	})

	const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
		resolver: yupResolver(schema)
	})

	const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
		const res = await login(data).unwrap()
		localStorage.setItem('token', res.accessToken)
	}

	return (
		<LoginDetailsWrapper>
			<form className={s.container} onSubmit={handleSubmit(onSubmit)}>
				<h1 className={s.title}>Sing in</h1>
				<div className={s.logo}>
					<Image src={googleLogo} alt={'sing in using google account'} onClick={() => {
					}} />
					<Image src={githubLogo} alt={'sing in using github account'} onClick={() => {
					}} />
				</div>
				<div className={s.inputItem}>
					<Input title='Email' register={register} name={'email'} error={errors.email?.message || ''} />
				</div>
				<div className={s.inputItem}>
					<Input type={passwordShown ? 'text' : 'password'} title='Password' register={register}
								 name={'password'}
								 error={errors.password?.message || ''} />
					<Image src={eyeOn} alt={'visible password'} onClick={togglePasswordVisiblity} />
				</div>
				<div className={s.forgotLinkBlock}>
					<Link className={s.forgotLink} href={'/auth/password-recovery'}> Forgot password</Link>
				</div>
				<Button title='Sing in' callback={() => {
				}} />
			</form>
			<div className={s.desc}>
				<div><span>Don’t have an account?</span></div>
				<Link className={s.link} href={'/registration'}>Sing up</Link>
			</div>
		</LoginDetailsWrapper>
	)
}
