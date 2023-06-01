import React, { ChangeEvent, FC, useState } from 'react'
import { Popup } from '@/components/Popup/Popup'
import s from './CreatePost.module.scss'
import { AddPhoto } from '@/modules/postModules/components/addPhoto/AddPhoto'
type PropsType = {
	onClose: () => void
}
export const CreatePost: FC<PropsType> = ({ onClose }) => {
	const [ava, setAva] = useState('')
	const [file, setFile] = useState<any>(null)
	const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0]
			setFile(file)
			if (file.size < 4000000) {
				convertFileToBase64(file, (file64: string) => {
					setAva(file64)
				})
			} else {
				console.error('Error: ', 'Файл слишком большого размера')
			}
		}
	}

	const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
		const reader = new FileReader()
		reader.onloadend = () => {
			const file64 = reader.result as string
			callBack(file64)
		}
		reader.readAsDataURL(file)
	}

	return (
		<Popup onClose={onClose}>
			<div className={s.container}>
				{ava === '' ? (
					<AddPhoto uploadHandler={uploadHandler} onClose={onClose} />
				) : (
					<h2>PHOTO COMPONENT</h2>
				)}
			</div>
		</Popup>

		// <Popup onClose={onClose}>
		// 	<TitlePopup title='Add photo' onClose={onClose} />
		// 	<div className={s.container}>
		// 		<div className={s.wrapper}>
		// 			<div className={s.photo}>
		// 				{ava === defaultAva ? (
		// 					<Image src={ava} alt='ava' width='222' height='228' />
		// 				) : (
		// 					<Image src={ava} alt='post-photo' width='492' height='564' />
		// 				)}
		//
		// 				<input
		// 					type='file'
		// 					onChange={uploadHandler}
		// 					style={{ display: 'none' }}
		// 					ref={inputRef}
		// 				/>
		// 			</div>
		// 			<div className={s.btn}>
		// 				<Button callback={refClick} title='Select from computer' />
		// 			</div>
		// 		</div>
		// 	</div>
		// </Popup>
	)
}
