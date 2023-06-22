import React, { ChangeEvent, useState } from 'react'
import { useAppSelector } from '../../../../../assets/hooks/useAppSelector'
import s from './EditPost.module.scss'
import Image from 'next/image'
import { TitlePopup } from '../../../../../components/TitlePopup/TitlePopup'
import { Button } from '../../../../../components/Button/Button'
import { selectAppStatus } from '../../../../appModules'
import { Avatar } from '../../../profileSettingsInformationModule/components/Avatar/Avatar'
import { TextArea } from '../../../../../components/TextArea/TextArea'
import { useFetchProfileQuery } from '../../../profileApi/profileApi'
import { selectShowedPost, useEditPostMutation } from '../../../../postModules'

type PropsType = {
	onClose: () => void
	description: string
	postId: string
}

export const EditPost = ({ onClose, description, postId }: PropsType) => {

	const [editPost] = useEditPostMutation()
	const [value, setValue] = useState(description)
	const { data } = useFetchProfileQuery(null)
	const appStatus = useAppSelector(selectAppStatus)
	const postImage = useAppSelector(selectShowedPost)

	const onEditPost = () => {
		editPost({ description: value, postId: postId })
	}

	const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.currentTarget.value)
	}

	return (
		<>
			<TitlePopup title={'Edit post'} onClose={onClose} />
			<div className={s.wrapper}>
				<Image
					className={s.closedPost}
					src={postImage}
					alt='post img'
					width={490}
					height={490}
					onClick={() => {}}
				/>
				<div className={s.content}>
					<div className={s.userInfo}>
						<Avatar small />
						<span>{data?.userName}</span>
					</div>
					<div className={s.description}>
						<div className={s.textArea}>
							<TextArea
								title='Add publication descriptions'
								placeholder='Text'
								value={value}
								onChange={onChange}
								maxLength={500}
							/>
						</div>
						{<span className={s.limit}>{value.length}/500</span>}
						<Button
							title='Save Changes'
							disabled={appStatus === 'loading'}
							callback={onEditPost}
						/>
					</div>
				</div>
			</div>
		</>
	)
}
