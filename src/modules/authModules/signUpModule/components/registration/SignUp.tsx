import { NextPageWithLayout } from 'pages/_app'
import { LoginDetailsWrapper } from 'components/LoginDetailsWrapper/LoginDetailsWrapper'
import s from './SignUp.module.scss'
import { Input } from 'components/Input/Input'
import { Button } from 'components/Button/Button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import googleIcon from '../../../../../../public/icons/google-icon.svg'
import githubIcon from '../../../../../../public/icons/github-icon.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAppSelector } from 'assets/hooks/useAppSelector'
import { RegisterParamsType, useRegistrationMutation } from 'modules/authModules/authApi/authApi'
import { loggedIn } from 'modules/authModules/authReducer/authSelectors'
import { PopupSignUp } from 'modules/authModules/signUpModule/components/popupSignUp/popupSignUp'

export const SignUp: NextPageWithLayout = () => {
	const isLoggedIn = useAppSelector(loggedIn)
	const [registration, { isLoading, isSuccess }] = useRegistrationMutation()
	const router = useRouter()
	const [email, setEmail] = useState('')

	const [isActive, setIsActive] = useState(false)

	const schema = yup.object().shape({
		userName: yup.string().required('').min(5, 'min 5 symbols'),
		email: yup.string().email('email should be correct').required('field required'),
		password: yup
			.string()
			.min(6, 'Password must be at least 6 characters')
			.max(20, 'Password must be at most 20 characters')
			.required('field required'),
		passwordConfirm: yup
			.string()
			.min(6, 'Password must be at least 6 characters')
			.max(20, 'Password must be at most 20 characters')
			.oneOf([yup.ref('password')], 'The password must match the new password')
			.required()
	})

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<RegisterParamsType>({
		resolver: yupResolver(schema)
	})

	const onSubmit: SubmitHandler<RegisterParamsType> = async data => {
		localStorage.setItem('email', data.email)
		setEmail(data.email)
		await registration(data)
	}

	const onClosePopupHandler = () => {
		setIsActive(false)
	}

	useEffect(() => {
		if (isLoggedIn) {
			router.push('/profile')
		}
	})

	useEffect(() => {
		if (isSuccess) {
			setIsActive(true)
		}
	}, [isSuccess])

	return (
		<>
			<LoginDetailsWrapper>
				<form className={s.container} onSubmit={handleSubmit(onSubmit)}>
					<h1 className={s.title}>Sign Up</h1>
					<div className={s.authIcons}>
						<Image className={s.icon} src={googleIcon} alt='google-icon' />
						<Image className={s.icon} src={githubIcon} alt='github-icon' />
					</div>
					<div>
						<div className={s.inputs}>
							<Input
								title='Username'
								register={register}
								name={'userName'}
								error={errors.userName?.message || ''}
							/>
							<Input
								title='Email'
								register={register}
								name={'email'}
								error={errors.email?.message || ''}
							/>

							<Input
								password
								title='Password'
								register={register}
								name={'password'}
								error={errors.password?.message || ''}
							/>
							<Input
								password
								title='Password confirmation'
								register={register}
								name={'passwordConfirm'}
								error={errors.password?.message || ''}
							/>
						</div>
						<div className={s.desc}>
							<span>Enter your email address and we will send you further instructions</span>
						</div>
					</div>
					<Button title='Sign Up' disabled={!!errors.password || isLoading} />
					<h3>Do you have an account?</h3>
					<Link className={s.link} href={'login'}>
						Sign In
					</Link>
				</form>
			</LoginDetailsWrapper>
			{isActive && <PopupSignUp email={email} onClosePopupHandler={onClosePopupHandler} />}
		</>
	)
}
