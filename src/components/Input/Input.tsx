import React from 'react';
import s from './Input.module.scss'

type PropsType = {
  title?: string
}

export const Input = ({title}: PropsType) => {
 return (
   <div className={s.container}>
     {title && <span>{title}</span>}
     <input/>
   </div>

 )
};
