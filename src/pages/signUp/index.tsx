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
import {InputPassword} from "@/components/Input/inputPassword";


const SignUp: NextPageWithLayout = () => {

  const [isActive, setIsActive] = useState(false)
  const [eye, setEye] = useState(true)

  const schema = yup.object().shape({
    userName: yup.string().required('').min(5, 'min 5 symbols'),
    email: yup.string().email('email should be correct').required('field required'),
    password: yup.string().required().min(5, 'min 5 symbols'),
    passwordConfirm: yup.string().required().min(5, 'min 5 symbols'),
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

  const eyeSwitch = () => {
    setEye(!eye)
  }

  return (
    <>
      <LoginDetailsWrapper>
        <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={s.title}>Sign Up</h1>
          <div>google</div>
          <div>
            <Input title="Username" register={register} name={'username'} error={errors.userName?.message || ''}/>
            <Input title="Email" register={register} name={'email'} error={errors.email?.message || ''}/>
            <InputPassword switchView title="Password" register={register} name={'password'}
                           error={errors.password?.message || ''}  eye={eye} onClick={eyeSwitch}/>
            <InputPassword switchView title="Password confirmation" register={register} name={'passwordConfirm'}
                           error={errors.passwordConfirm?.message || ''}  eye={eye} onClick={eyeSwitch}/>
            <div className={s.desc}>
              <span>Enter your email address and we will send you further instructions</span>
            </div>
          </div>
          <Button title="Sign Up" callback={() => {}} disabled={!!errors.email}/>
          <h3>Do you have an account?</h3>
          <Link className={s.link} href={'/signIn'}>Sign In</Link>
        </form>
      </LoginDetailsWrapper>
      {isActive &&
        <Popup onClose={onClosePopupHandler}>
          <TitlePopup title="Successfully" onClose={onClosePopupHandler}/>
          <div className={s.notification}>
            <div className={s.btn}>
              <Button title="OK" callback={onClosePopupHandler}/>
            </div>
          </div>
        </Popup>}
    </>
  );
};

SignUp.getLayout = getLayout
export default SignUp

//types
export type FormData = {
  userName: string
  email: string
  password: string
  passwordConfirm: string
}