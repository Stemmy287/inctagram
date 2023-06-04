import React, { PropsWithChildren } from 'react'
import s from './NotificationPage.module.scss'
import { NextPage } from 'next'
import Image, { StaticImageData } from 'next/image'

type PropsType = {
	title: string
	message: string
	image: StaticImageData
}

export const NotificationPage:NextPage<PropsWithChildren & PropsType> = ({title, message, image, children}) => {
 return (
  <div className={s.container}>
		<div className={s.content}>
			<h1>{title}</h1>
			<span>{message}</span>
			{children}
		</div>
		<Image src={image} alt={'notification img'} priority={true}/>
  </div>
 );
};
