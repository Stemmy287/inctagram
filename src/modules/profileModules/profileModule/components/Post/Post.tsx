import React, { useState } from 'react'
import s from './Post.module.scss'
import Image from 'next/image'
import close from '../../../../../../public/icons/closeIcon.svg'
import { FetchPostResponseType, postActions, PostMenuModule } from '../../../../postModules'
import { Popup } from '../../../../../components/Popup/Popup'
import { useAppSelector } from '../../../../../assets/hooks/useAppSelector'
import { selectUser } from '../../../profileReducer/profileReducer-selector'

import { useAppDispatch } from '../../../../../assets/hooks/useAppDispatch'
import { Avatar } from '../../../profileSettingsInformationModule/components/Avatar/Avatar'

type PropsType = {
	post: FetchPostResponseType
}

export const Post = ({ post }: PropsType) => {
	const [isActive, setIsActive] = useState(false)
	const user = useAppSelector(selectUser)
	const dispatch = useAppDispatch()

	const onCloseHandler = () => {
		setIsActive(false)
	}

	const onModalHandler = () => {
		setIsActive(true)
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
									<span>{user?.userName}</span>
								</div>
								<PostMenuModule description={post.description} postId={post.id.toString()} />
							</div>
							<div className={s.description}>
								<div>{post.description}</div>
							</div>
						</div>
						<Image src={close} alt='close' className={s.close} onClick={onCloseHandler} />
					</div>
				</Popup>
			)}
		</>
	)
}

