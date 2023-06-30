import React from 'react'
import s from './DeletePost.module.scss'
import { useDeletePostMutation } from '../../../../postModules'
import { TitlePopup } from '../../../../../components/TitlePopup/TitlePopup'
import { Button } from '../../../../../components/Button/Button'
import { useAppSelector } from '../../../../../assets/hooks/useAppSelector'
import { selectAppStatus } from '../../../../appModules'
import { useRouter } from 'next/router'
import { en } from '../../../../../locales/en'
import { ru } from '../../../../../locales/ru'

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

	const router = useRouter()

	const t = router.locale === 'en' ? en : ru

	return (
		<>
			<TitlePopup onClose={onClose} title={t.deletePost} />
			<div className={s.notification}>
				<span className={s.description}>{t.sureDelete}</span>
				<div className={s.logout}>
					<div className={s.btns}>
						<Button
							title={t.yes}
							callback={deletePostHandler}
							disabled={appStatus === 'loading'}
							style={'opacity'}
						/>
					</div>
					<div className={s.btns}>
						<Button
							title={t.no}
							callback={onClose}
							disabled={appStatus === 'loading'}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

