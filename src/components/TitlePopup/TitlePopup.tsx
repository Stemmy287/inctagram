import React from 'react'
import s from './TitlePopup.module.scss'
import closeIcon from '../../../public/icons/close.svg'
import Image from 'next/image'

type PropsType = {
	title: string
	onClose: () => void
}

export const TitlePopup = ({ title, onClose }: PropsType) => {
	return (
		<div className={s.container}>
			<h3>{title}</h3>
			<Image src={closeIcon} alt={'close'} onClick={onClose} />
		</div>
	)
}
