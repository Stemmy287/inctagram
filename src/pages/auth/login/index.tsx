import React from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout'
import { Login } from '@/modules/authModules'
const LoginPage: NextPageWithLayout = () => <Login />

LoginPage.getLayout = getLayout
export default LoginPage
