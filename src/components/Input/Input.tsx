import React, {ChangeEvent} from 'react';
import s from './Input.module.scss'

type PropsType = {
  title?: string
  disabled?: boolean
  value: string
  onChange: (value: string) => void
}

export const Input = ({title, disabled, value, onChange}: PropsType) => {

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value)
  }

 return (
   <div className={s.container}>
     {title && <span>{title}</span>}
     <input value={value} onChange={onChangeHandler} disabled={disabled}/>
   </div>

 )
};
