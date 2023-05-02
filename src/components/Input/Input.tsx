import React from 'react';
import s from './Input.module.scss'

type PropsType = {
  title?: string
  disabled?: boolean
}

export const Input = ({title, disabled}: PropsType) => {
 return (
   <div className={s.container}>
     {title && <span>{title}</span>}
     <input disabled={disabled}/>
   </div>

 )
};
