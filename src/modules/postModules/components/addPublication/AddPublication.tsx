import s from './AddPublication.module.scss'
import React, { ChangeEvent, FC, useState } from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { AppRootStateType } from 'store/store'
import { FlagType, HeaderForModal, useAddPostMutation, useAddPostPhotoMutation } from 'modules/postModules'
import { useAppSelector } from '../../../../assets/hooks/useAppSelector'
import { TextArea } from '../../../../components/TextArea/TextArea'
import { Avatar } from '../../../profileModules/profileSettingsInformationModule/components/Avatar/Avatar'
import { selectUser } from '../../../profileModules/profileReducer/profileReducer-selector'

type PropsType = {
	onClose: () => void
	setFlag: (flag: FlagType) => void
}

export const AddPublication: FC<PropsType> = ({ onClose, setFlag }) => {

	const [description, setDescription] = useState('')

	const [addPostPhoto] = useAddPostPhotoMutation()
	const [addPost] = useAddPostMutation()

	const finalPics = useSelector<AppRootStateType, File>(state => state.postReducer.filteredPics)
	const urlFinalPics = useSelector<AppRootStateType, string>(
		state => state.postReducer.urlFilteredPics
	)

	const user = useAppSelector(selectUser)

	const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
			setDescription(e.currentTarget.value)
	}

	const onAddPost = async () => {
		const formData = new FormData()
		formData.append('file', finalPics)

		const res = await addPostPhoto(formData).unwrap()
		await addPost({ description, childrenMetadata: [{ uploadId: res.images[0].uploadId }] })
		onClose()
	}

	return (
			<>
				<HeaderForModal
					title='Publication'
					btnTitle='Publish'
					clickBack={() => setFlag('filter')}
					callBack={onAddPost}
				/>
				<div className={s.wrapper}>
					<Image src={urlFinalPics} alt='publication-photo' width={486} height={500} />
					<div className={s.postInfo}>
						<div className={s.profileInfo}>
							<Avatar small/>
							<span>{user?.userName}</span>
						</div>
						<div className={s.desc}>
							<div className={s.textArea}>
								<TextArea
									title='Add publication descriptions'
									placeholder='Text'
									value={description}
									onChange={onChange}
									maxLength={500}
								/>
							</div>
							{<span className={s.limit}>{description.length}/500</span>}
						</div>
					</div>
				</div>
			</>
	)
}
