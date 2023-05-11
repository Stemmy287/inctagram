import googleLogo from '/public/icons/googleSvg.svg'
import githubLogo from '/public/icons/githubSvg.svg'
import s from '@/modules/authModules/loginLogoutModule/components/Login/Login.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/Button/Button'
import { Input } from '@/components/Input/Input'
import { LoginDetailsWrapper } from '@/components/LoginDetailsWrapper/LoginDetailsWrapper'
import { NextPageWithLayout } from '@/pages/_app'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLoginMutation } from '@/modules/authModules'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/assets/hooks/useAppSelector'
import { loggedIn } from '@/modules/authModules/authReducer/authSelectors'
import { LoginFormData } from '@/modules/authModules/authApi/authApi'

export const Login: NextPageWithLayout = () => {
	const [login, { isLoading }] = useLoginMutation()

	const isLoggedIn = useAppSelector(loggedIn)

	const router = useRouter()

	if (isLoggedIn) {
		router.push('/profile')
	}

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

	const onSubmit: SubmitHandler<LoginFormData> = async data => {
		const res = await login(data).unwrap()
		localStorage.setItem('token', res.accessToken)
	}

	return (
		<LoginDetailsWrapper>
			<form className={s.container} onSubmit={handleSubmit(onSubmit)}>
				<h1 className={s.title}>Sing in</h1>
				<div className={s.logo}>
					<Image src={googleLogo} alt={'sing in using google account'} onClick={() => {}} />
					<Image src={githubLogo} alt={'sing in using github account'} onClick={() => {}} />
				</div>
				<Input
					title='Email'
					register={register}
					name={'email'}
					error={errors.email?.message || ''}
					disabled={isLoading}
				/>
				<Input
					title='Password'
					register={register}
					name={'password'}
					error={errors.password?.message || ''}
					disabled={isLoading}
					password
				/>
				<div className={s.forgotLinkBlock}>
					<Link className={s.forgotLink} href={'password-recovery'}>
						{' '}
						Forgot password
					</Link>
				</div>
				<Button title='Sing in' disabled={isLoading}/>
			</form>
			<div className={s.desc}>
				<div>
					<span>Don’t have an account?</span>
				</div>
				<Link className={s.link} href={'sign-up'}>
					Sing up
				</Link>
			</div>
		</LoginDetailsWrapper>
	)
}
