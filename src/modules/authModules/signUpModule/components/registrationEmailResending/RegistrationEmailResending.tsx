import { NotificationPage } from '@/components/NotificationPage/NotificationPage'
import img from '@/../public/icons/rafiki.svg'
import { Button } from '@/components/Button/Button'
import { useRegEmailResendingMutation } from '@/modules/authModules/authApi/authApi'

export const RegistrationEmailResending = () => {
	const [regEmailResending, { isLoading }] = useRegEmailResendingMutation()

	const sendEmailResendingHandler = () => {
		const email = localStorage.getItem('email')
		if (email) {
			regEmailResending({ email })
		}
	}

	return (
		<NotificationPage
			image={img}
			message={
				'Looks like the verification link has expired. Not to worry, we can send the link again'
			}
			title={'Email verification link expired'}
		>
			<Button title={'Resend verification link'} callback={sendEmailResendingHandler} />
		</NotificationPage>
	)
}
