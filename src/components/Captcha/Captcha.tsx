import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import s from './Captcha.module.scss'

type PropsType = {
  callback: (value: string) => void
  error: boolean
}

export const Captcha = ({callback, error}: PropsType) => {

  const onChangeHandler = (value: string | null) => {
    callback(value || '')
  }

 return (
  <div className={error ? s.error : ''}>
    <ReCAPTCHA
      sitekey="6LdUtdklAAAAAIAhcAayU_lJI6vMPtMNe3jbLtK0"
      onChange={onChangeHandler}
      theme={"dark"}
      hl={'en'}
    />
    {error && <span>Please verify that you are not a robot</span>}
  </div>
 );
};
