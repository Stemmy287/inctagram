import { NextPageWithLayout } from 'pages/_app'
import { getAuthLayout } from 'components/Layout/AuthLayout/AuthLayout'
import { RegistrationEmailResending } from 'modules/authModules'

const RegistrationEmailResendPage: NextPageWithLayout = () => <RegistrationEmailResending />

RegistrationEmailResendPage.getLayout = getAuthLayout
export default RegistrationEmailResendPage
