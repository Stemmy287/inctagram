import React, { useState } from 'react'
import defaultAva from '../../../../../public/images/defaultPhoto.png'
import deleteAva from '../../../../../public/icons/delete-ava.svg'
import Image, { StaticImageData } from 'next/image'
import { Button } from '@/components/Button/Button'
import { AddAvatar } from '@/modules/profileModules/uploadImage/AddAvatar'
import { useAppSelector } from '@/assets/hooks/useAppSelector'
import s from './EditAvatar.module.scss'

export const EditAvatar = () => {
	// const { data } = useGetUserQuery()
	// const newAva = data?.avatars[1].url
	// const [deleteImage] = useUploadImageMutation()

	const avaNew = useAppSelector(state => state.uploadImage.avatar)
	const [ava, setAva] = useState<string|StaticImageData>(defaultAva)
	const [openModal, setOpenModal] = useState(false)

	const onClose = () => {
		setOpenModal(!openModal)
	}
	const deleteImageHandler = () => {}

	// useEffect(() => {
	// 	setAva(avaNew)
	// }, [])

	return (
		<div className={s.container}>
			<Image src={ava} alt='ava' width='192' height='192' style={{ borderRadius: '50%' }} />
			<Image src={deleteAva} alt='delete-ava' onClick={deleteImageHandler}/>
			<Button callback={onClose} title='Add a profile photo' />
			{openModal && <AddAvatar onClose={onClose} />}
		</div>
	)
}
