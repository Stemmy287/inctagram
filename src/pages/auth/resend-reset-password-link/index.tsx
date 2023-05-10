import React from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout'
import { ResendLink } from '@/components/ResendLink/ResendLink'
import { useRecoveryPasswordMutation } from '@/modules/authModules'

const ResetPasswordPage: NextPageWithLayout = () => {
	const [recoveryPassword, { isLoading }] = useRecoveryPasswordMutation()

	const onResendHandler = () => {
		const email = localStorage.getItem('email')
		if (email) {
			recoveryPassword({ email })
		}
	}

	return <ResendLink title={'invalid'} buttonTitle={'Resend link'} callback={onResendHandler} isLoading={isLoading} />
}

ResetPasswordPage.getLayout = getLayout
export default ResetPasswordPage
