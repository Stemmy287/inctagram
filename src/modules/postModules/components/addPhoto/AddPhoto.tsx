import React, { ChangeEvent, FC } from 'react'
import defaultAva from '/public/images/defaultPhoto.png'
import Image from 'next/image'
import { Button } from 'components/Button/Button'
import s from './AddPhoto.module.scss'
import { TitlePopup } from 'components/TitlePopup/TitlePopup'
import { useDispatch } from 'react-redux'
import { FlagType, postActions } from 'modules/postModules'
import { useRouter } from 'next/router'
import { en } from '../../../../locales/en'
import { ru } from '../../../../locales/ru'

type PropsType = {
	uploadHandler?: (e: ChangeEvent<HTMLInputElement>) => void
	onClose: () => void
	setFlag: (flag: FlagType) => void
}

export const AddPhoto: FC<PropsType> = ({ onClose, setFlag }) => {
	const dispatch = useDispatch()

	const inputRef = React.useRef<HTMLInputElement>(null)
	const refClick = () => inputRef.current?.click()

	const upLoadHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length) {
			const file = e.target.files?.[0]

			if (file) {
				const reader = new FileReader()
				reader.onload = () => {
					dispatch(postActions.setUrlOriginalPics({ urlOriginalPics: reader.result as string }))
				}
				reader.readAsDataURL(file)
			}
			dispatch(postActions.setOriginalPics({ originalPics: file }))
		}
		setFlag('crop')
	}

	const router = useRouter()

	const t = router.locale === 'en' ? en : ru

	return (
		<>
			<TitlePopup title={t.addPhoto} onClose={onClose} />
			<div className={s.container}>
				<div className={s.wrapper}>
					<div className={s.photo}>
						<Image src={defaultAva} alt='post-photo' width='222' height='222' />
						<input
							type='file'
							onChange={upLoadHandler}
							style={{ display: 'none' }}
							ref={inputRef}
						/>
					</div>
					<div className={s.btn}>
						<Button callback={refClick} title={t.selectFromComputer} />
					</div>
				</div>
			</div>
		</>
	)
}
