import React, { useState } from 'react'
import s from './Post.module.scss'
import Image from 'next/image'
import close from '../../../../../../public/icons/closeIcon.svg'
import { FetchPostResponseType } from 'modules/postModules/postApi/postApi'
import { Popup } from '../../../../../components/Popup/Popup'
import { PostMenuModule } from 'modules/postModules/components/postMenuModule/PostMenu'
import { useAppSelector } from '../../../../../assets/hooks/useAppSelector'
import { selectUser } from '../../../profileReducer/profileReducer-selector'
import { Avatar } from '../../../profileSettingsModule/components/Avatar/Avatar'


type PropsType = {
	post: FetchPostResponseType
}

export const Post = ({ post }: PropsType) => {

	const [isActive, setIsActive] = useState(false)
	const user = useAppSelector(selectUser)

	const onCloseHandler = () => {
		setIsActive(false)
	}

	const onModalHandler = () => {
		setIsActive(true)
	}

	const filterImageSize = () => {
		return post.images.filter(ps => ps.width === 640)
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
			{isActive && <Popup onClose={onCloseHandler}>
				<div className={s.openedPost}>
					<Image
						src={filterImageSize()[0].url}
						alt='post img'
						width={filterImageSize()[0].width}
						height={filterImageSize()[0].height}
					/>
					<div className={s.content}>
						<div className={s.header}>
							<Avatar />
							<span>{user?.userName}</span>
							<div className={s.burgerMenu}>
								<PostMenuModule postId={post.id.toString()} />
							</div>
						</div>
					</div>
					<Image src={close} alt='close' className={s.close} onClick={onCloseHandler} />
				</div>
			</Popup>}
		</>
	)
}

