import React, { useState } from 'react'
import deleteAva from '../../../../../public/icons/delete-ava.svg'
import Image from 'next/image'
import s from './EditAvatar.module.scss'
import { AddAvatar } from 'modules/profileModules/components/uploadImage/AddAva/AddAvatar'
import { useDeleteAvatarMutation } from 'modules/profileModules/profileApi/profileApi'
import { Avatar } from '../Avatar/Avatar'
import { Button } from '../../../../components/Button/Button'

export const EditAvatar = () => {
	const [openModal, setOpenModal] = useState(false)
	const [deleteAvatar] = useDeleteAvatarMutation()

	const onCloseHandler = () => setOpenModal(!openModal)
	const deleteAvatarHandler = () => deleteAvatar()

	return (
		<div className={s.container}>
			<div className={s.photoWrapper}>
				<Avatar />
				<Image
					src={deleteAva}
					alt='delete-ava'
					onClick={deleteAvatarHandler}
					className={s.closeImg}
				/>
			</div>
			<Button title={'Add a profile photo'} style={'opacity'} callback={onCloseHandler}/>
			{openModal && <AddAvatar onClose={onCloseHandler} />}
		</div>
	)
}
