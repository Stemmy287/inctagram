import { NextPageWithLayout } from 'pages/_app'
import { getLayout } from 'components/Layout/BaseLayout/BaseLayout'
import { SignUp } from 'modules/authModules/signUpModule/components/registration/SignUp'

const SignUpPage: NextPageWithLayout = () => <SignUp />

SignUpPage.getLayout = getLayout
export default SignUpPage
