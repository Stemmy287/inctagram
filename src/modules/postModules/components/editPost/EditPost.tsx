import React, { ChangeEvent, useState } from 'react'
import { useEditPostMutation } from '../../postApi/postApi'
import { useAppSelector } from '../../../../assets/hooks/useAppSelector'
import { selectUser } from '../../../profileModules/profileReducer/profileReducer-selector'
import { Popup } from '../../../../components/Popup/Popup'
import s from '../editPost/EditPost.module.scss'
import Image from 'next/image'
import { Avatar } from '../../../profileModules/components/Avatar/Avatar'
import { TitlePopup } from '../../../../components/TitlePopup/TitlePopup'
import { Button } from '../../../../components/Button/Button'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { selectAppStatus } from '../../../appModules'
import { selectShowedPost } from '../../postReducer/postReducer-selector'

type PropsType = {
	onClose: () => void
	description: string
	postId: string
}

type disType = {
	description: string
}

export const EditPost = ({ onClose, description, postId }: PropsType) => {
	const [isActive, setIsActive] = useState(false)
	const [editPost] = useEditPostMutation()
	const [value, setValue] = useState(description)
	const user = useAppSelector(selectUser)
	const appStatus = useAppSelector(selectAppStatus)
	const postImage = useAppSelector(selectShowedPost)

	const schema = yup.object().shape({
		description: yup.string().required('add about')
	})

	const { register, handleSubmit } = useForm<disType>({
		resolver: yupResolver(schema)
	})

	const onSubmit: SubmitHandler<disType> = data => {
		editPost({ description: data.description, postId: postId })
	}

	const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.currentTarget.value)
	}
	const onCloseHandler = () => {
		setIsActive(false)
	}

	const onModalHandler = () => {
		setIsActive(true)
	}

	return (
		<>
			<Popup onClose={onCloseHandler}>
				<div className={s.editPost}>
					<TitlePopup title={'Edit post'} onClose={onClose} />
					<div className={s.wrapper}>
						<div className={s.imageWrapper}>
							<Image
								className={s.closedPost}
								src={postImage}
								alt='post img'
								width={485}
								height={485}
								onClick={onModalHandler}
							/>
						</div>
						<div className={s.content}>
							<div className={s.userInfo}>
								<Avatar />
								<span>{user?.userName}</span>
							</div>
							<div className={s.description}>
								<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
									<div className={s.descriptionBlock}>
										<label>Add publication description</label>
										<textarea
											{...register('description')}
											rows={4}
											value={value}
											onChange={onChangeHandler}
										/>
									</div>
									<div className={s.btnBlock}>
										<Button title='Save Changes' disabled={appStatus === 'loading'} />
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</Popup>
		</>
	)
}
