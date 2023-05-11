import React from 'react';
import Image from 'next/image'
import spinner from '../../../public/icons/preloader.svg'
import s from './Preloader.module.scss'
export const Preloader = () => <Image className={s.preloader} src={spinner} alt='spinner'/>

