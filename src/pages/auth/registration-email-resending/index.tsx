import { NextPageWithLayout } from 'pages/_app'
import { getLayout } from 'components/Layout/BaseLayout/BaseLayout'
import { RegistrationEmailResending } from 'modules/authModules'

const RegistrationEmailResendPage: NextPageWithLayout = () => <RegistrationEmailResending />

RegistrationEmailResendPage.getLayout = getLayout
export default RegistrationEmailResendPage
