import React, { ChangeEvent, FC, useState } from 'react'
import defaultAva from '../../../../../../public/images/defaultPhoto.png'
import Image, { StaticImageData } from 'next/image'
import { Button } from 'components/Button/Button'
import { Popup } from 'components/Popup/Popup'
import s from './AddAvatar.module.scss'
import { TitlePopup } from 'components/TitlePopup/TitlePopup'
import { useAppDispatch } from 'assets/hooks/useAppDispatch'
import { useUploadImageMutation } from 'modules/profileModules/profileApi/profileApi'
import { appActions } from 'modules/appModules'
import { convertFileToBase64 } from 'assets/utils/convertFileToBase64/convertFileToBase64'

type PropsType = {
	onClose: () => void
}

export const AddAvatar: FC<PropsType> = ({ onClose }) => {
	const dispatch = useAppDispatch()
	const [ava, setAva] = useState<StaticImageData | string>(defaultAva)
	const [file, setFile] = useState<File>()
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
				dispatch(appActions.setAppError({ error: 'File is too big' }))
			}
		}
	}

	const onSaveHandler = async () => {
		const formData = new FormData()
		formData.append('file', file as File)

		await uploadImage(formData)
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
