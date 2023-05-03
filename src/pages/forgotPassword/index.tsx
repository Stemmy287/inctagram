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
import {SubmitHandler, useForm} from "react-hook-form";

import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Captcha} from "@/components/Captcha/Captcha";

const ForgotPassword: NextPageWithLayout = () => {

  const [isActive, setIsActive] = useState(false)

  const schema = yup.object().shape({
    email: yup.string().email('email should be correct').required('field required'),
    captcha: yup.string().required('enter captcha')
  })

  const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
    setIsActive(true)
  }

  const onClosePopupHandler = () => {
    setIsActive(false)
  }

  const onCaptcha = (value: string) => {
    //@ts-ignore
    setValue('captcha', value)
  }

  return (
    <>
      <LoginDetailsWrapper>
        <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={s.title}>Forgot Password</h1>
          <div>
            <Input title="Email" register={register} name={'email'} error={errors.email?.message || ''}/>
            <div className={s.desc}>
              <span>Enter your email address and we will send you further instructions</span>
            </div>
          </div>
          <Button title="Send Link" callback={() => {}} disabled={!!errors.email}/>
          <Link className={s.link} href={''}>Back to Sign In</Link>
          <Captcha callback={onCaptcha} error={!!errors.captcha?.message}/>
        </form>
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

//types
export type FormData = {
  email: string
  captcha: string
}