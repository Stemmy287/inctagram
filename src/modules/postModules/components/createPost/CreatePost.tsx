import React, { ChangeEvent, FC, useState } from 'react'
import { Popup } from '@/components/Popup/Popup'
import s from './CreatePost.module.scss'
import { AddPhoto } from '@/modules/postModules/components/addPhoto/AddPhoto'
import { AddPublication } from '@/modules/postModules/components/addPublication/AddPublication'

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
					<AddPublication photo={ava} onClose={onClose} file={file} />
				)}
			</div>
		</Popup>
	)
}
