import { getAuthLayout } from 'components/Layout/AuthLayout/AuthLayout'
import { SignUp } from 'modules/authModules'
import { NextPageWithLayout } from 'pages/_app'

const SignUpPage: NextPageWithLayout = () => <SignUp />

SignUpPage.getLayout = getAuthLayout
export default SignUpPage
