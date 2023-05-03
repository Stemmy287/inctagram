import {getLayout} from "@/components/Layout/BaseLayout/BaseLayout";
import {NextPageWithLayout} from "@/pages/_app";
import {LoginDetailsWrapper} from "@/components/LoginDetailsWrapper/LoginDetailsWrapper";
import s from '@/styles/ForgotPassword.module.scss'
import {Input} from "@/components/Input/Input";
import {Button} from "@/components/Button/Button";
import Link from "next/link";
import {Popup} from "@/components/Popup/Popup";
import {TitlePopup} from "@/components/TitlePopup/TitlePopup";
import {useState} from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ForgotPassword: NextPageWithLayout = () => {

  const [isActive, setIsActive] = useState(false)

  const onClosePopupHandler = () => {
    setIsActive(false)
  }

  const onCaptcha = (value: string) => {
    console.log(value)
  }

  return (
    <>
      <LoginDetailsWrapper>
        <div className={s.container}>
          <h1 className={s.title}>Forgot Password</h1>
          <div>
            <Input title="Email" value={''} onChange={() => {}}/>
            <div className={s.desc}>
              <span>Enter your email address and we will send you further instructions</span>
            </div>
          </div>
          <Button title="Send Link" callback={() => {}}/>
          <Link className={s.link} href={''}>Back to Sign In</Link>
          <ReCAPTCHA
            sitekey="6LdUtdklAAAAAIAhcAayU_lJI6vMPtMNe3jbLtK0"
            onChange={onCaptcha}
            theme={"dark"}
            hl={'en'}
          />
        </div>
      </LoginDetailsWrapper>
      {isActive &&
        <Popup onClose={onClosePopupHandler}>
          <TitlePopup title="Email sent" onClose={onClosePopupHandler}/>
          <div className={s.notification}>
            <span>We have sent a link to confirm your email to epam@epam.com</span>
            <div className={s.btn}>
             <Button title="OK" callback={onClosePopupHandler}/>
            </div>
          </div>
        </Popup>}
    </>
  );
};

ForgotPassword.getLayout = getLayout
export default ForgotPassword
