import { getAuthLayout } from 'components/Layout/AuthLayout/AuthLayout'
import { NextPageWithLayout } from 'pages/_app'
import { PasswordRecovery } from 'modules/authModules'

const PasswordRecoveryPage: NextPageWithLayout = () => <PasswordRecovery />

PasswordRecoveryPage.getLayout = getAuthLayout
export default PasswordRecoveryPage