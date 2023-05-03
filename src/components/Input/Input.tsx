import React from 'react';
import s from './Input.module.scss'
import {FieldValues, UseFormRegister} from 'react-hook-form'

type PropsType = {
  title?: string
  disabled?: boolean
  error?: string
  register: UseFormRegister<FieldValues>
  name: string
}

export const Input = ({title, disabled, register, name, error}: PropsType) => {


 return (
   <div className={s.container}>
     {title && <span className={s.title}>{title}</span>}
     <input className={error ? `${s.input} ${s.errorInput}` : s.input} disabled={disabled} {...register(name)}/>
     {error && <span className={s.error}>{error}</span>}
   </div>

 )
};
