import React from 'react'
import { NextPageWithLayout } from 'pages/_app'
import { getAuthLayout } from 'components/Layout/AuthLayout/AuthLayout'
import { Login } from 'modules/authModules'

const LoginPage: NextPageWithLayout = () => <Login />

LoginPage.getLayout = getAuthLayout
export default LoginPage
