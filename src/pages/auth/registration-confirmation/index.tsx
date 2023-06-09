import { getAuthLayout } from 'components/Layout/AuthLayout/AuthLayout'
import { ConfirmationReg } from 'modules/authModules/signUpModule/components/registrationСonfirmation/ConfirmationReg'
import { NextPageWithLayout } from 'pages/_app'

const ConfirmationRegPage: NextPageWithLayout = () => <ConfirmationReg />

ConfirmationRegPage.getLayout = getAuthLayout
export default ConfirmationRegPage
