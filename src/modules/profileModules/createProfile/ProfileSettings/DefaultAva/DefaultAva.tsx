import React from 'react'
import image from '../../../../../../public/icons/image.svg'
import s from './DefaultAva.module.scss'
import Image from 'next/image'

export const DefaultAva = () => {
	return (
		<div className={s.borderDefault}>
			<Image src={image} alt={'ava'} width={48} height={48} />
		</div>
	)
}
