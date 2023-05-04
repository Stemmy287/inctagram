import {getLayout} from "@/components/Layout/BaseLayout/BaseLayout";
import {NextPageWithLayout} from "@/pages/_app";
import {RecoveryPassword} from "@/modules/authModules/passwordRecoveryModule/components/recoveryPassword/RecoveryPassword";

const ForgotPassword: NextPageWithLayout = () => <RecoveryPassword/>

ForgotPassword.getLayout = getLayout
export default ForgotPassword