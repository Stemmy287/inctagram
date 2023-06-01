import { Popup } from '@/components/Popup/Popup'
import s from './AddPublication.module.scss'
import { FC } from 'react'
import { TitlePopup } from '@/components/TitlePopup/TitlePopup'
import Image from 'next/image'
import { Input } from '@/components/Input/Input'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@/components/Button/Button'
import {
	FetchPostResponseType,
	PostType,
	useAddPostMutation,
	useAddPostPhotoMutation
} from '@/modules/postModules/postApi/postApi'

type PropsType = {
	photo: string
	file: File
	onClose: () => void
}
export const AddPublication: FC<PropsType> = ({ photo, onClose }) => {
	const schema = yup.object().shape({
		description: yup.string().required('add about')
	})
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<PostType>({
		resolver: yupResolver(schema)
	})
	const [addPostPhoto] = useAddPostPhotoMutation()
	const [addPost] = useAddPostMutation()
	const onSubmit: SubmitHandler<PostType> = async data => {
		addPost(data)
	}

	return (
		<Popup onClose={onClose}>
			<div className={s.container}>
				<TitlePopup title='Add publication' onClose={onClose} />
				<div className={s.wrapper}>
					<div className={s.photo}>
						<Image src={photo} alt='publication-photo' width='350' height={450} />
					</div>
					<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
						<label>Add publication description</label>
						<textarea placeholder='Textarea' {...register('description')} rows={4} />
						{/*<Input title='Add location' register={register} name={'location'} />*/}
						<Button title='Add publication' />
					</form>
				</div>
			</div>
		</Popup>
	)
}
