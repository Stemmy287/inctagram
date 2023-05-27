import { NotificationPage } from '@/components/NotificationPage/NotificationPage'
import { NextPageWithLayout } from '@/pages/_app'
import { NextRouter, useRouter } from 'next/router'
import img from '@/../public/icons/bro.svg'
import { Button } from '@/components/Button/Button'
import { useRegConfirmationMutation } from '@/modules/authModules'
import { useEffect } from 'react'
import { useAppSelector } from '@/assets/hooks/useAppSelector'
import { selectAppError } from '@/modules/appModules'

export const ConfirmationReg: NextPageWithLayout = () => {
	const [regConfirmation, { isSuccess }] = useRegConfirmationMutation()
	const globalError = useAppSelector(selectAppError)

	const router: NextRouter = useRouter()
	const code = router.query.code

	const redirecting = () => {
		router.push('login')
	}

	useEffect(() => {
		if (typeof code === 'string') {
			regConfirmation({ confirmationCode: code })
		}
	}, [code])

	useEffect(() => {
		if (globalError === 'Confirmation code is invalid') {
			router.push('registration-email-resending')
		}
	}, [globalError])

	return (
		<>
			{isSuccess ? (
				<NotificationPage
					title={'Congratulations!'}
					message={'Your email has been confirmed'}
					image={img}
				>
					<Button title='Sing In' callback={redirecting}></Button>
				</NotificationPage>
			) : (
				<></>
			)}
		</>
	)
}
