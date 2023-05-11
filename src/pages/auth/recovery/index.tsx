import React from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { ResetPassword } from '@/modules/authModules'
import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout'

const ResetPasswordPage: NextPageWithLayout = () => <ResetPassword />

ResetPasswordPage.getLayout = getLayout
export default ResetPasswordPage

