import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import s from './Input.module.scss'
import {FieldValues, UseFormRegister} from 'react-hook-form'

type PropsType =Omit<DefaultInputPropsType, 'type'> & {
  title?: string
  disabled?: boolean
  error?: string
  register: UseFormRegister<FieldValues>
  name: string
}
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

export const Input = ({title, disabled, register, name, error,...restProps}: PropsType  ) => {


 return (
   <div className={s.container}>
     {title && <span className={s.title}>{title}</span>}
     <input className={error ? `${s.input} ${s.errorInput}` : s.input} disabled={disabled} {...register(name)} {...restProps}/>
     {error && <span className={s.error}>{error}</span>}
   </div>

 )
};
