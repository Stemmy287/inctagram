import googleLogo from '/public/icons/googleSvg.svg'
import githubLogo from '/public/icons/githubSvg.svg'
import s from 'modules/authModules/loginLogoutModule/components/Login/Login.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from 'components/Button/Button'
import { Input } from 'components/Input/Input'
import { LoginDetailsWrapper } from 'components/LoginDetailsWrapper/LoginDetailsWrapper'
import { NextPageWithLayout } from 'pages/_app'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useAppSelector } from 'assets/hooks/useAppSelector'
import { loggedIn } from 'modules/authModules/authReducer/authSelectors'
import { LoginFormData, useLoginMutation } from 'modules/authModules/authApi/authApi'
import { useEffect } from 'react'
import { en } from 'locales/en'
import { ru } from 'locales/ru'

export const Login: NextPageWithLayout = () => {
	const [login, { isLoading }] = useLoginMutation()

	const isLoggedIn = useAppSelector(loggedIn)

	const router = useRouter()

	const t = router.locale === 'en' ? en : ru

	useEffect(() => {
		if (isLoggedIn) {
			router.push('/profile')
		}
	}, [isLoggedIn, router])

	const schema = yup.object().shape({
		email: yup.string().email('email should be correct').required('field required'),
		password: yup.string().required('enter password')
	})

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginFormData>({
		resolver: yupResolver(schema)
	})

	const onSubmit: SubmitHandler<LoginFormData> = data => {
		login(data)
	}

	return (
		<LoginDetailsWrapper>
			<form className={s.container} onSubmit={handleSubmit(onSubmit)}>
				<h1 className={s.title}>{t.signIn}</h1>
				<div className={s.logo}>
					<Image src={googleLogo} alt={'sing in using google account'} onClick={() => {}} />
					<Image src={githubLogo} alt={'sing in using github account'} onClick={() => {}} />
				</div>
				<Input
					title={t.email}
					register={register}
					name={'email'}
					error={errors.email?.message || ''}
					disabled={isLoading}
				/>
				<Input
					title={t.password}
					register={register}
					name={'password'}
					error={errors.password?.message || ''}
					disabled={isLoading}
					password
				/>
				<div className={s.forgotLinkBlock}>
					<Link className={s.forgotLink} href={'password-recovery'}>
						{' '}
						{t.forgotPassword}
					</Link>
				</div>
				<Button title={t.signIn} disabled={isLoading} />
			</form>
			<div className={s.desc}>
				<div>
					<span>{t.dontHaveAccount}</span>
				</div>
				<Link className={s.link} href={'sign-up'}>
					{t.signUp}
				</Link>
			</div>
		</LoginDetailsWrapper>
	)
}
