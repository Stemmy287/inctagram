import React, { FC } from 'react'
import s from './HeaderModalPosts.module.scss'
import Image from 'next/image'
import arrowBack from '../../../../../public/icons/arrow-ios-back.svg'

type PropsType = {
	title: string
	callBack: () => void
	clickBack: () => void
	btnTitle: string
}

export const HeaderModalPosts: FC<PropsType> = ({ btnTitle, title, callBack, clickBack }) => {
	return (
		<div className={s.header}>
			<Image src={arrowBack} alt={'back button'} onClick={clickBack} className={s.arrow} />
			<h1>{title}</h1>
			<button onClick={callBack} className={s.btn}>
				{btnTitle}
			</button>
		</div>
	)
}
