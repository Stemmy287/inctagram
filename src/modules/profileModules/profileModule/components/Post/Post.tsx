import React, { useState } from 'react'
import s from './Post.module.scss'
import Image from 'next/image'
import { FetchPostResponseType } from '@/modules/postModules/postApi/postApi'
import { Popup } from '@/components/Popup/Popup'
import { useFetchProfileQuery } from '@/modules/profileModules/profileApi/profileApi'
import defaultPhoto from 'public/images/defaultPhoto.png'
import close  from 'public/icons/closeIcon.svg'
import { PostMenuModule } from '@/modules/postModules/components/postMenuModule/PostMenu'

type PropsType = {
	post: FetchPostResponseType
}

export const Post = ({ post }: PropsType) => {

	const [isActive, setIsActive] = useState(false)
	const {data: profile} = useFetchProfileQuery()

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
				width={230}
				height={230}
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
							<Image
								src={profile?.avatars[0].url || defaultPhoto}
								alt='ava'
								width={36}
								height={36}
							/>
							<span>{profile?.userName}</span>
							<div className={s.burgerMenu}>
								<PostMenuModule postId={'111'} />
							</div>
						</div>
					</div>
					<Image src={close} alt='close' className={s.close} onClick={onCloseHandler}/>
				</div>
			</Popup>}
		</>
	)
}

