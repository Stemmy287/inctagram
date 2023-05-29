import React, { useEffect, useState } from 'react'
import defaultAva from '../../../../../public/images/defaultPhoto.png'
import deleteAva from '../../../../../public/icons/delete-ava.svg'
import Image, { StaticImageData } from 'next/image'
import { AddAvatar } from '@/modules/profileModules/uploadImage/AddAvatar'
import { useAppSelector } from '@/assets/hooks/useAppSelector'
import s from './EditAvatar.module.scss'

export const EditAvatar = () => {
	const avaNew = useAppSelector(state => state.uploadImage.avatar)
	const [ava, setAva] = useState<string | StaticImageData>(defaultAva)
	const [openModal, setOpenModal] = useState(false)

	const onClose = () => {
		setOpenModal(!openModal)
	}
	const deleteImageHandler = () => {
		setAva(defaultAva)
	}

	useEffect(() => {
		setAva(avaNew)
	}, [avaNew])

	return (
		<div className={s.container}>
			<div className={s.photoWrapper}>
				<Image src={ava} alt='ava' width='192' height='192' className={s.photo} />
				<Image src={deleteAva} alt='delete-ava' onClick={deleteImageHandler} className={s.closeImg} />
			</div>

			<div onClick={onClose} className={s.btn}>
				Add a profile photo
			</div>
			{openModal && <AddAvatar onClose={onClose} />}
		</div>
	)
}
