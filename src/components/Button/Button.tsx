import React from 'react';
import s from './Button.module.scss'

type PropsType = {
  title: string
  callback?: () => void
  disabled?: boolean
}

export const Button = ({title, callback, disabled}: PropsType) => {

 return <button className={s.btn} disabled={disabled} onClick={callback}>{title}</button>;

};
