import React, { useEffect, useState } from 'react'
import { NextPageWithLayout } from 'pages/_app'
import { NotificationPage } from 'components/NotificationPage/NotificationPage'
import timeImage from '../../../../../../public/icons/rafiki.svg'
import { Button } from 'components/Button/Button'
import { Popup } from 'components/Popup/Popup'
import { Notification } from 'components/Notification/Notification'
import { useRecoveryPasswordMutation } from 'modules/authModules/authApi/authApi'

export const ResendResetPasswordLink: NextPageWithLayout = () => {
	const [recoveryPassword, { isLoading, isSuccess, reset }] = useRecoveryPasswordMutation()

	const [email, setEmail] = useState<null | string>()

	const [isActive, setIsActive] = useState(false)

	const onClosePopupHandler = () => {
		setIsActive(false)
	}
	const onResendHandler = async () => {
		if (email) {
			await recoveryPassword({ email })
		}
	}

	if (isSuccess) {
		setIsActive(true)
		reset()
	}

	useEffect(() => {
		setEmail(localStorage.getItem('email'))
	}, [])

	return (
		<>
			<NotificationPage
				title='Email verification link invalid'
				message={
					'Looks like the verification link has expired. Not to worry, we can send the link again'
				}
				image={timeImage}
			>
				<Button title='Resend link' callback={onResendHandler} disabled={isLoading} />
			</NotificationPage>
			{isActive && (
				<Popup onClose={onClosePopupHandler}>
					<Notification
						title={'Email sent'}
						buttonTitle={'OK'}
						message={`We have sent a link to confirm your email to ${email}`}
						onClose={onClosePopupHandler}
					/>
				</Popup>
			)}
		</>
	)
}
