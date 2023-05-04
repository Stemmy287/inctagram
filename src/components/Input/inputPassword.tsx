import React from 'react';
import s from './inputPassword.module.scss'
import {FieldValues, UseFormRegister} from 'react-hook-form'


type PropsType = {
  title?: string
  disabled?: boolean
  error?: string
  register: UseFormRegister<FieldValues>
  name: string
    onClick: ()=> void
    eye: boolean
}

export const InputPassword = ({title, disabled, register, name, error, onClick, eye }: PropsType) => {

const passwordView = eye ? 'password' : 'text'
 return (
   <div className={s.container}>
     {title && <span className={s.title}>{title}</span>}
     <input className={error ? `${s.input} ${s.errorInput}` : s.input} disabled={disabled} {...register(name)} type={passwordView}/>
       <div onClick={onClick} className={s.eye}>
           {eye? 'eye' : 'eoff'}
       </div>
     {error && <span className={s.error}>{error}</span>}
   </div>

 )
};
