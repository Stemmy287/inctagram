import {getLayout} from "@/components/Layout/BaseLayout/BaseLayout";
import {NextPageWithLayout} from "@/pages/_app";
import {LoginDetailsWrapper} from "@/components/LoginDetailsWrapper/LoginDetailsWrapper";
import s from '@/styles/ForgotPassword.module.scss'
import {Input} from "@/components/Input/Input";
import {Button} from "@/components/Button/Button";

const ForgotPassword: NextPageWithLayout = () => {
  return (
    <LoginDetailsWrapper>
      <div className={s.container}>
        <h1 className={s.title}>Forgot Password</h1>
        <Input title="Email"/>
        <div className={s.desc}>
          <span>Enter your email address and we will send you further instructions</span>
        </div>
        <Button title="Send Link" callback={() => {}}/>
      </div>
    </LoginDetailsWrapper>
  );
};

ForgotPassword.getLayout = getLayout
export default ForgotPassword
