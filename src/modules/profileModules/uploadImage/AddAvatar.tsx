import React, { ChangeEvent, FC, useState } from 'react'
import defaultAva from '../../../../public/images/defaultPhoto.png'
import Image from 'next/image'
import { Button } from '@/components/Button/Button'
import { Popup } from '@/components/Popup/Popup'
import { useUploadImageMutation } from '@/modules/profileModules/uploadImage/uploadImageApi'
import s from './AddAvatar.module.scss'
import { TitlePopup } from '@/components/TitlePopup/TitlePopup'

type PropsType = {
	onClose: () => void
}
export const AddAvatar: FC<PropsType> = ({ onClose }) => {
	const [ava, setAva] = useState<any>(defaultAva)
	const [file, setFile] = useState<any>(null)
	const inputRef = React.useRef<HTMLInputElement>(null)
	const refClick = () => inputRef.current?.click()
	const [uploadImage] = useUploadImageMutation()

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

	const onSaveHandler = () => {
		uploadImage(file)
		onClose()
	}
	return (
		<Popup onClose={onClose}>
			<TitlePopup title='Add a profile photo' onClose={onClose} />
			<div className={s.container}>
				<div className={s.wrapper}>
					<div className={s.photo}>
						<Image src={ava} alt='ava' width='222' height='228' />
						<input type='file' onChange={uploadHandler} style={{ display: 'none' }} ref={inputRef} />
					</div>
					<div className={s.btn}>
						{ava === defaultAva ? (
							<Button callback={refClick} title='Select from computer' />
						) : (
							<Button callback={onSaveHandler} title='Save' />
						)}
					</div>
				</div>
			</div>
		</Popup>
	)
}
