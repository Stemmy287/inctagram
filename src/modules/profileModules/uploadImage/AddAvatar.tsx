import React, { ChangeEvent, FC, useState } from 'react'
import defaultAva from '../../../../public/images/defaultPhoto.png'
import Image, { StaticImageData } from 'next/image'
import { Button } from '@/components/Button/Button'
import { Popup } from '@/components/Popup/Popup'
import { useUploadImageMutation } from '@/modules/profileModules/uploadImage/uploadImageApi'

type PropsType = {
	onClose: () => void
}
export const AddAvatar: FC<PropsType> = ({ onClose }) => {
	const [ava, setAva] = useState<any>(defaultAva)
	const [file, setFile] = useState<any>(null)
	const [isAvaBroken, setIsAvaBroken] = useState(false)
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

	const errorHandler = () => {
		setIsAvaBroken(true)
		alert('Кривая картинка')
	}
	const onSaveHandler = () => {
		uploadImage(file)
		onClose()
	}
	return (
		<Popup onClose={onClose}>
			<Image src={isAvaBroken ? defaultAva : ava} onError={errorHandler} alt='ava' width='300' height='300' />
			<label>
				<input type='file' onChange={uploadHandler} style={{ display: 'none' }} ref={inputRef} />
			</label>

			{ava === defaultAva ? (
				<Button callback={refClick} title='Select from computer' />
			) : (
				<Button callback={onSaveHandler} title='Save' />
			)}
		</Popup>
	)
}
