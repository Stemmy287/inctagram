import React, { useState } from 'react'
import s from './Post.module.scss'
import Image from 'next/image'
import close from '../../../../../../public/icons/closeIcon.svg'
import { BurgerMenu, FetchPostResponseType, postActions } from '../../../../postModules'
import { Popup } from '../../../../../components/Popup/Popup'
import { useAppDispatch } from '../../../../../assets/hooks/useAppDispatch'
import { Avatar } from '../../../profileSettingsInformationModule/components/Avatar/Avatar'
import { useFetchProfileQuery } from '../../../profileApi/profileApi'
import { EditPost } from '../EditPost/EditPost'
import { DeletePost } from '../DeletePost/DeletePost'

type PropsType = {
	post: FetchPostResponseType
}

export const Post = ({ post }: PropsType) => {

	const [isActive, setIsActive] = useState(false)
	const [isEditActive, setIsEditActive] = useState(false)
	const [isDeleteActive, setIsDeleteActive] = useState(false)
	const { data } = useFetchProfileQuery(null)
	const dispatch = useAppDispatch()

	const onCloseHandler = () => {
		setIsActive(false)
	}

	const onModalHandler = () => {
		setIsActive(true)
	}

	const onEditClick = () => {
		setIsEditActive(true)
	}

	const onEditClose = () => {
		setIsEditActive(false)
	}

	const onDeleteClick = () => {
		setIsDeleteActive(true)
	}

	const onDeleteClose = () => {
		setIsDeleteActive(false)
	}

	const filterImageSize = () => {
		const filtered = post.images.filter(ps => ps.width === 640)
		dispatch(postActions.setShowedPost({ value: filtered[0].url }))
		return filtered
	}

	return (
		<>
			<Image
				className={s.closedPost}
				src={filterImageSize()[0].url}
				alt='post img'
				width={234}
				height={229}
				onClick={onModalHandler}
			/>
			{isActive && (
				<Popup onClose={onCloseHandler}>
					<div className={s.openedPost}>
						<Image
							src={filterImageSize()[0].url}
							alt='post img'
							width={filterImageSize()[0].width}
							height={filterImageSize()[0].height}
						/>
						<div className={s.content}>
							<div className={s.header}>
								<div className={s.avatarAndLogin}>
									<Avatar small />
									<span>{data?.userName}</span>
								</div>
								<BurgerMenu
									onEditClick={onEditClick}
									onDeleteClick={onDeleteClick}
								/>
							</div>
							<div className={s.description}>
								<div>{post.description}</div>
							</div>
						</div>
						<Image src={close} alt='close' className={s.close} onClick={onCloseHandler} />
					</div>
				</Popup>
			)}
			{isEditActive && (
				<Popup onClose={onEditClose}>
					<EditPost description={post.description} onClose={onEditClose} postId={post.id.toString()} />
				</Popup>
			)}
			{isDeleteActive && (
				<Popup onClose={onDeleteClose}>
					<DeletePost onClose={onDeleteClose} postId={post.id.toString()}/>
				</Popup>
			)}
		</>
	)
}
