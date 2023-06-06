import { getLayout } from 'components/Layout/BaseLayout/BaseLayout'
import { ConfirmationReg } from 'modules/authModules/signUpModule/components/registrationСonfirmation/ConfirmationReg'
import { NextPageWithLayout } from 'pages/_app'

const ConfirmationRegPage: NextPageWithLayout = () => <ConfirmationReg />

ConfirmationRegPage.getLayout = getLayout
export default ConfirmationRegPage
