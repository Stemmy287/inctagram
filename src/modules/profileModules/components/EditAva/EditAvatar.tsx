import React, { useState } from 'react'
import deleteAva from '../../../../../public/icons/delete-ava.svg'
import Image from 'next/image'
import s from './EditAvatar.module.scss'
import { useAppSelector } from 'assets/hooks/useAppSelector'
import { DefaultAva } from '../DefaultAva/DefaultAva'
import { AddAvatar } from 'modules/profileModules/components/uploadImage/AddAva/AddAvatar'
import { selectUser } from 'modules/profileModules/profileReducer/profileReducer-selector'
import { useDeleteAvatarMutation } from 'modules/profileModules/profileApi/profileApi'

export const EditAvatar = () => {
	const avaFromServer = useAppSelector(selectUser)
	const [openModal, setOpenModal] = useState(false)
	const [deleteAvatar] = useDeleteAvatarMutation()

	const onCloseHandler = () => setOpenModal(!openModal)
	const deleteAvatarHandler = () => deleteAvatar()

	return (
		<div className={s.container}>
			<div className={s.photoWrapper}>
				{avaFromServer ? (
					<Image
						src={avaFromServer.avatars[1].url}
						alt={'ava'}
						className={s.photo}
						width={192}
						height={192}
					/>
				) : (
					<DefaultAva />
				)}
				<Image
					src={deleteAva}
					alt='delete-ava'
					onClick={deleteAvatarHandler}
					className={s.closeImg}
				/>
			</div>
			<div onClick={onCloseHandler} className={s.btn}>
				Add a profile photo
			</div>
			{openModal && <AddAvatar onClose={onCloseHandler} />}
		</div>
	)
}
