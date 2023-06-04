import React from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout'
import { ResendResetPasswordLink } from '@/modules/authModules'

const ResendResetPasswordLinkPage: NextPageWithLayout = () => <ResendResetPasswordLink />

ResendResetPasswordLinkPage.getLayout = getLayout
export default ResendResetPasswordLinkPage
