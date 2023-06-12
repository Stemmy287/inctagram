import { Popup } from 'components/Popup/Popup'
import s from './AddPublication.module.scss'
import { FC } from 'react'
import { TitlePopup } from 'components/TitlePopup/TitlePopup'
import Image from 'next/image'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'components/Button/Button'
import { useSelector } from 'react-redux'
import { AppRootStateType } from 'store/store'
import { PostType, useAddPostMutation, useAddPostPhotoMutation } from 'modules/postModules'

type PropsType = {
	onClose: () => void
}

export const AddPublication: FC<PropsType> = ({ onClose }) => {
	const schema = yup.object().shape({
		description: yup.string().required('add about')
	})

	const { register, handleSubmit } = useForm<PostType>({
		resolver: yupResolver(schema)
	})

	const [addPostPhoto] = useAddPostPhotoMutation()
	const [addPost] = useAddPostMutation()

	const onSubmit: SubmitHandler<PostType> = async data => {
		const formData = new FormData()
		formData.append('file', finalPics)

		const res = await addPostPhoto(formData).unwrap()
		await addPost({ ...data, childrenMetadata: [{ uploadId: res.images[0].uploadId }] })
		onClose()
	}

	const finalPics = useSelector<AppRootStateType, File>(state => state.postReducer.filteredPics)
	const urlFinalPics = useSelector<AppRootStateType, string>(
		state => state.postReducer.urlFilteredPics
	)
	return (
		<Popup onClose={onClose}>
			<div className={s.container}>
				<TitlePopup title='Add publication' onClose={onClose} />
				<div className={s.wrapper}>
					<div className={s.photo}>
						<Image src={urlFinalPics} alt='publication-photo' width='350' height={450} />
					</div>
					<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
						<label>Add publication description</label>
						<textarea placeholder='Textarea' {...register('description')} rows={4} />
						<Button title='Add publication' />
					</form>
				</div>
			</div>
		</Popup>
	)
}
