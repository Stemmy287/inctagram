import { NotificationPage } from '@/components/NotificationPage/NotificationPage'
import img from '@/../public/icons/rafiki.svg'
import { Button } from '@/components/Button/Button'
import { useRegEmailResendingMutation } from '@/modules/authModules/authApi/authApi'
import { PopupSignUp } from '../popupSignUp/popupSignUp'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/assets/hooks/useAppSelector'
import { loggedIn } from '@/modules/authModules/authReducer/authSelectors'
import router from 'next/router'

export const RegistrationEmailResending = () => {
	const email = localStorage.getItem('email')
	const isLoggedIn = useAppSelector(loggedIn)
	const [isActive, setIsActive] = useState(false)
	const [regEmailResending, { isSuccess }] = useRegEmailResendingMutation()

	const sendEmailResendingHandler = () => {
		if (email) {
			regEmailResending({ email })
		}
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
			<NotificationPage
				image={img}
				message={
					'Looks like the verification link has expired. Not to worry, we can send the link again'
				}
				title={'Email verification link expired'}
			>
				<Button title={'Resend verification link'} callback={sendEmailResendingHandler} />
			</NotificationPage>
			{isActive && email && <PopupSignUp email={email} onClosePopupHandler={onClosePopupHandler} />}
		</>
	)
}
