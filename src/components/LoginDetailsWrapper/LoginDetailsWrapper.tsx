import React, {PropsWithChildren} from 'react';
import s from './LoginDetailsWrapper.module.scss'
import {NextPage} from "next";

export const LoginDetailsWrapper: NextPage<PropsWithChildren> = ({children}) => {
 return (
  <div className={s.container}>
   {children}
  </div>
 );
};
