import {getLayout} from "@/components/Layout/BaseLayout/BaseLayout";
import {NextPageWithLayout} from "@/pages/_app";
import {LoginDetailsWrapper} from "@/components/LoginDetailsWrapper/LoginDetailsWrapper";
import s from '@/styles/ForgotPassword.module.scss'

const ForgotPassword: NextPageWithLayout = () => {
  return (
    <LoginDetailsWrapper>
      <div className={s.container}>
        <h1 className={s.title}>Forgot Password</h1>
      </div>
    </LoginDetailsWrapper>
  );
};

ForgotPassword.getLayout = getLayout
export default ForgotPassword
