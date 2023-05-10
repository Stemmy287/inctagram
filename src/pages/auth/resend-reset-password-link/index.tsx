import React from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout'
import { ResendLink } from '@/components/ResendLink/ResendLink'
import { useRecoveryPasswordMutation } from '@/modules/authModules'

const ResetPasswordPage: NextPageWithLayout = () => {

  const [recoveryPassword] =	useRecoveryPasswordMutation()

	const onResendHandler = () => {
		const email = localStorage.getItem('email')
		if (email) {
			recoveryPassword({email})
		}
	}

	return <ResendLink title={'invalid'} callback={onResendHandler} />
}

ResetPasswordPage.getLayout = getLayout
export default ResetPasswordPage
