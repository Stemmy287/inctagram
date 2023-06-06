import { getLayout } from 'components/Layout/BaseLayout/BaseLayout'
import { NextPageWithLayout } from 'pages/_app'
import { PasswordRecovery } from 'modules/authModules'

const PasswordRecoveryPage: NextPageWithLayout = () => <PasswordRecovery />

PasswordRecoveryPage.getLayout = getLayout
export default PasswordRecoveryPage