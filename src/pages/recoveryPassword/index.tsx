import {getLayout} from "@/components/Layout/BaseLayout/BaseLayout";
import {NextPageWithLayout} from "@/pages/_app";
import {RecoveryPassword} from "@/modules/authModules/passwordRecoveryModule";


const ForgotPassword: NextPageWithLayout = () => <RecoveryPassword/>

ForgotPassword.getLayout = getLayout
export default ForgotPassword