import React from 'react'
import s from './DeletePost.module.scss'
import { useDeletePostMutation } from '../../../../postModules'
import { TitlePopup } from '../../../../../components/TitlePopup/TitlePopup'
import { Button } from '../../../../../components/Button/Button'
import { useAppSelector } from '../../../../../assets/hooks/useAppSelector'
import { selectAppStatus } from '../../../../appModules'

type PropsType = {
	onClose: () => void
	postId: string
}

export const DeletePost = ({onClose, postId}: PropsType) => {

	const appStatus = useAppSelector(selectAppStatus)

	const [deletePost] = useDeletePostMutation()

	const deletePostHandler = async () => {
		await deletePost(postId)
		onClose()
	}

	return (
		<>
			<TitlePopup onClose={onClose} title={'Delete Post'} />
			<div className={s.notification}>
				<span className={s.description}>Are you sure you want to delete this post?</span>
				<div className={s.logout}>
					<div className={s.btns}>
						<Button
							title={'Yes'}
							callback={deletePostHandler}
							disabled={appStatus === 'loading'}
							style={'opacity'}
						/>
					</div>
					<div className={s.btns}>
						<Button
							title={'No'}
							callback={onClose}
							disabled={appStatus === 'loading'}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

