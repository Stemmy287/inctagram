import { NotificationPage } from '@/components/NotificationPage/NotificationPage'
import { NextPageWithLayout } from '@/pages/_app'
import { useRouter } from 'next/router'
import img from './bro.svg'
import { Button } from '@/components/Button/Button'
import { useRegConfirmationMutation } from '@/modules/authModules'
import { useEffect } from 'react'

export const ConfirmationReg: NextPageWithLayout = () => {

	const [regConfirmation] = useRegConfirmationMutation()

	const router = useRouter()
	const { code } = router.query

	const redirecting = () => {
		router.push('login')
	}

	useEffect(() => {
		regConfirmation({ confirmationCode: code })
	}, [code, regConfirmation])

	return (
		<NotificationPage title={'Congratulations!'} message={'Your email has been confirmed'} image={img}>
			<Button title='Sing In' callback={redirecting}></Button>
		</NotificationPage>
	)
}