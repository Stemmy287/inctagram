import { FC, useRef, useState } from 'react'
import s from './PostMenu.module.scss'
import postMenu from '../../../../../public/icons/more-horizontal-outline.svg'
import trash from '../../../../../public/icons/trash-outline.svg'
import edit from '../../../../../public/icons/edit-2-outline.svg'
import Image from 'next/image'
import { FetchPostResponseType, useDeletePostMutation } from '../../postApi/postApi'
import { Popup } from 'components/Popup/Popup'
import { TitlePopup } from 'components/TitlePopup/TitlePopup'
import { Button } from 'components/Button/Button'
import { useAppSelector } from 'assets/hooks/useAppSelector'
import { selectAppStatus } from 'modules/appModules'
import useOnClickOutside from 'assets/hooks/useOutsideClick'
import { EditPost } from '../editPost/EditPost'

type PropsType = {
	postId: string
	description: string
}

export const PostMenuModule: FC<PropsType> = ({ postId, description }) => {
	const [deletePost] = useDeletePostMutation()
	const appStatus = useAppSelector(selectAppStatus)
	const [isEditPopupOpen, setEditPopupOpen] = useState(false)
	const [showPopup, setShowPopup] = useState(false)
	const [showMenu, setShowMenu] = useState(false)

	const ref = useRef(null)
	useOnClickOutside(ref, () => setShowMenu(false), 'showMenu')

	const showMenuHandler = () => {
		setShowMenu(!showMenu)
	}

	const openPopupHandler = () => {
		setShowPopup(true)
	}

	const closePopupHandler = () => {
		setShowPopup(false)
	}
	const openEditPopup = () => {
		setEditPopupOpen(true)
	}
	const closeEditPopup = () => {
		setEditPopupOpen(false)
	}
	const deletePostHandler = async () => {
		await deletePost(postId)
		setShowMenu(false)
		setShowPopup(false)
	}

	return (
		<>
			<div className={s.container}>
				<Image
					src={postMenu}
					alt='postMenu'
					onClick={showMenuHandler}
					className={s.showmenu}
					id={'showMenu'}
				/>
				{showMenu && (
					<div className={s.menu} ref={ref}>
						<label className={s.action} onClick={openEditPopup}>
							<Image src={edit} alt='edit' />
							<div className={s.btn}>Edit post</div>
						</label>
						<label className={s.action} onClick={openPopupHandler}>
							<Image src={trash} alt='trash' />
							<div className={s.btn}>Delete post</div>
						</label>
					</div>
				)}
			</div>
			{isEditPopupOpen && (
				<EditPost description={description} onClose={closeEditPopup} postId={postId} />
			)}
			{showPopup && (
				<Popup onClose={closePopupHandler}>
					<TitlePopup onClose={closePopupHandler} title={'Delete Post'} />
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
									callback={closePopupHandler}
									disabled={appStatus === 'loading'}
								/>
							</div>
						</div>
					</div>
				</Popup>
			)}
		</>
	)
}
