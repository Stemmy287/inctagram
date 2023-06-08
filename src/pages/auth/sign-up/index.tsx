import { getLayout } from 'components/Layout/BaseLayout/BaseLayout'
import { SignUp } from 'modules/authModules'
import { NextPageWithLayout } from 'pages/_app'

const SignUpPage: NextPageWithLayout = () => <SignUp />

SignUpPage.getLayout = getLayout
export default SignUpPage
