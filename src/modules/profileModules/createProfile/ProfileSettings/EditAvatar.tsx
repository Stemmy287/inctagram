import React, { useState } from 'react'
import deleteAva from '../../../../../public/icons/delete-ava.svg'
import Image from 'next/image'
import s from './EditAvatar.module.scss'
import { useAppSelector } from 'assets/hooks/useAppSelector'
import { useGetUserQuery } from 'modules/profileModules/createProfile/createProfileApi'
import { DefaultAva } from 'modules/profileModules/createProfile/ProfileSettings/DefaultAva'
import { AddAvatar } from 'modules/profileModules/uploadImage/AddAvatar'

export const EditAvatar = () => {
	// const {} = useGetUserQuery()

	const avaFromServer = useAppSelector(state => state.createProfileReducer.ava)
	const [openModal, setOpenModal] = useState(false)

	const onClose = () => {
		setOpenModal(!openModal)
	}

	const deleteImageHandler = () => {}

	return (
		<div className={s.container}>
			<div className={s.photoWrapper}>
				{avaFromServer ? (
					<Image src={avaFromServer} alt={'ava'} className={s.photo} width={192} height={192} />
				) : (
					<DefaultAva />
				)}
				<Image
					src={deleteAva}
					alt='delete-ava'
					onClick={deleteImageHandler}
					className={s.closeImg}
				/>
			</div>
			<div onClick={onClose} className={s.btn}>
				Add a profile photo
			</div>
			{openModal && <AddAvatar onClose={onClose} />}
		</div>
	)
}
