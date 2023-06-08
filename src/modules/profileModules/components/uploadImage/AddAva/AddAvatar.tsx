import React, { ChangeEvent, FC, useState } from 'react'
import defaultAva from '../../../../../../public/images/defaultPhoto.png'
import Image from 'next/image'
import { Button } from 'components/Button/Button'
import { Popup } from 'components/Popup/Popup'
import s from './AddAvatar.module.scss'
import { TitlePopup } from 'components/TitlePopup/TitlePopup'
import { useAppDispatch } from 'assets/hooks/useAppDispatch'
import { useUploadImageMutation } from 'modules/profileModules/profileApi/createProfileApi'
import { profileActions } from 'modules/profileModules/profileReducer/profileReducer'
import { appActions } from 'modules/appModules'

type PropsType = {
	onClose: () => void
}
export const AddAvatar: FC<PropsType> = ({ onClose }) => {
	const dispatch = useAppDispatch()
	const [ava, setAva] = useState<any>(defaultAva)
	const [file, setFile] = useState<File | null>(null)
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
				dispatch(appActions.setAppError({ error: 'Файл слишком большого размера' }))
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
		const formData = new FormData()
		formData.append('file', file as File)

		uploadImage(formData)
			.unwrap()
			.then(() =>
				convertFileToBase64(file as File, (file64: string) => {
					dispatch(profileActions.setAva({ ava: file64 }))
				})
			)
		onClose()
	}
	return (
		<Popup onClose={onClose}>
			<TitlePopup title='Add a profile photo' onClose={onClose} />
			<div className={s.container}>
				<div className={s.wrapper}>
					<div className={s.photo}>
						<Image src={ava} alt='ava' width='222' height='228' />
						<input
							type='file'
							onChange={uploadHandler}
							style={{ display: 'none' }}
							ref={inputRef}
						/>
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
