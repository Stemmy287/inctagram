import React from 'react'
import s from './PaymentButton.module.scss'
import Image, { StaticImageData } from 'next/image'

type PropsType = {
	img: StaticImageData
}

export const PaymentButton = ({img}: PropsType) => {
	return (
		<button className={s.btn}><Image src={img} alt='payment system'/></button>
	)
}

