import React from 'react'
import { NextPageWithLayout } from 'pages/_app'
import { getAuthLayout } from 'components/Layout/AuthLayout/AuthLayout'
import { ResendResetPasswordLink } from 'modules/authModules'

const ResendResetPasswordLinkPage: NextPageWithLayout = () => <ResendResetPasswordLink />

ResendResetPasswordLinkPage.getLayout = getAuthLayout
export default ResendResetPasswordLinkPage
