import React, { useState } from 'react'
import deleteAva from '../../../../../../public/icons/delete-ava.svg'
import Image from 'next/image'
import s from './EditAvatar.module.scss'
import { AddAvatar } from 'modules/profileModules/profileSettingsInformationModule/components/AddAva/AddAvatar'
import { useDeleteAvatarMutation } from 'modules/profileModules/profileApi/profileApi'
import { Avatar } from '../Avatar/Avatar'
import { Button } from '../../../../../components/Button/Button'
import { useAppSelector } from 'assets/hooks/useAppSelector'
import { selectAva } from 'modules/profileModules/profileReducer/profileReducer-selector'

export const EditAvatar = () => {
	const avatarFromServer = useAppSelector(selectAva)
	const [openModal, setOpenModal] = useState(false)
	const [deleteAvatar] = useDeleteAvatarMutation()

	const onCloseHandler = () => setOpenModal(!openModal)
	const deleteAvatarHandler = () => deleteAvatar()

	return (
		<div className={s.container}>
			<div className={s.photoWrapper}>
				<Avatar />
				{!!avatarFromServer?.length && (
					<Image
						src={deleteAva}
						alt='delete-ava'
						onClick={deleteAvatarHandler}
						className={s.closeImg}
						width={16}
						height={16}
					/>
				)}
			</div>
			<Button title={'Add a profile photo'} style={'opacity'} callback={onCloseHandler} />
			{openModal && <AddAvatar onClose={onCloseHandler} />}
		</div>
	)
}
