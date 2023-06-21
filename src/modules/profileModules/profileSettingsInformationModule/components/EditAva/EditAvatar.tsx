import React, { useState } from 'react'
import deleteAva from '../../../../../../public/icons/delete-ava.svg'
import Image from 'next/image'
import s from './EditAvatar.module.scss'
import { AddAvatar } from 'modules/profileModules/profileSettingsInformationModule/components/AddAva/AddAvatar'
import {
	useDeleteAvatarMutation,
	useFetchProfileQuery
} from 'modules/profileModules/profileApi/profileApi'
import { Avatar } from '../Avatar/Avatar'
import { Button } from '../../../../../components/Button/Button'
import { useAppSelector } from '../../../../../assets/hooks/useAppSelector'
import { selectAppStatus } from '../../../../appModules'

export const EditAvatar = () => {
	const { data, isLoading } = useFetchProfileQuery(null)
	const status = useAppSelector(selectAppStatus)

	const [openModal, setOpenModal] = useState(false)
	const [deleteAvatar] = useDeleteAvatarMutation()

	const onCloseHandler = () => setOpenModal(!openModal)
	const deleteAvatarHandler = () => deleteAvatar()

	return (
		<div className={s.container}>
			<div className={s.photoWrapper}>
				<Avatar />
				{!!data?.avatars.length && (
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
			<Button
				title={'Add a profile photo'}
				style={'opacity'}
				callback={onCloseHandler}
				disabled={status === 'loading'}
			/>
			{openModal && <AddAvatar onClose={onCloseHandler} />}
		</div>
	)
}
