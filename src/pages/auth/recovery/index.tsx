import React from 'react'
import { NextPageWithLayout } from 'pages/_app'
import { ResetPassword } from 'modules/authModules'
import { getAuthLayout } from 'components/Layout/AuthLayout/AuthLayout'

const ResetPasswordPage: NextPageWithLayout = () => <ResetPassword />

ResetPasswordPage.getLayout = getAuthLayout
export default ResetPasswordPage
