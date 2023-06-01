import React, { ChangeEvent, FC, useState } from 'react'
import defaultAva from '/public/images/defaultPhoto.png'
import Image from 'next/image'
import { Button } from '@/components/Button/Button'
import { Popup } from '@/components/Popup/Popup'
import s from './AddPhoto.module.scss'
import { TitlePopup } from '@/components/TitlePopup/TitlePopup'

type PropsType = {
	uploadHandler: (e: ChangeEvent<HTMLInputElement>) => void
	onClose: () => void
}

export const AddPhoto: FC<PropsType> = ({ uploadHandler, onClose }) => {
	const inputRef = React.useRef<HTMLInputElement>(null)
	const refClick = () => inputRef.current?.click()
	const upLoadHandler = (e: ChangeEvent<HTMLInputElement>) => {
		upLoadHandler(e)
	}

	return (
		<>
			<TitlePopup title='Add photo' onClose={onClose} />
			<div className={s.wrapper}>
				<div className={s.photo}>
					<Image src={defaultAva} alt='post-photo' width='192' height='192' />
					<input type='file' onChange={uploadHandler} style={{ display: 'none' }} ref={inputRef} />
				</div>
				<div className={s.btn}>
					<Button callback={refClick} title='Select from computer' />
				</div>
			</div>
		</>
	)
}
