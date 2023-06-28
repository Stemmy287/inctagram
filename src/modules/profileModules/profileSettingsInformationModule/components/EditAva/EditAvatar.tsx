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
import { useRouter } from 'next/router'
import { en } from '../../../../../locales/en'
import { ru } from '../../../../../locales/ru'

export const EditAvatar = () => {
	const { data } = useFetchProfileQuery(null)
	const status = useAppSelector(selectAppStatus)

	const [openModal, setOpenModal] = useState(false)
	const [deleteAvatar] = useDeleteAvatarMutation()

	const router = useRouter()

	const t = router.locale === 'en' ? en : ru

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
				title={t.addAProfilePhoto}
				style={'opacity'}
				callback={onCloseHandler}
				disabled={status === 'loading'}
			/>
			{openModal && <AddAvatar onClose={onCloseHandler} />}
		</div>
	)
}
