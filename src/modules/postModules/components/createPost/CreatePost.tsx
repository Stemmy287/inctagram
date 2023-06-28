import { Popup } from 'components/Popup/Popup'
import React, { FC, useState } from 'react'
import s from './CreatePost.module.scss'
import { AddFilters, AddPhoto, AddPublication, CropEasy } from 'modules/postModules'
import { TitlePopup } from '../../../../components/TitlePopup/TitlePopup'
import { Button } from '../../../../components/Button/Button'
import { useRouter } from 'next/router'
import { en } from '../../../../locales/en'
import { ru } from '../../../../locales/ru'

type PropsType = {
	onClose: () => void
}
export type FlagType = 'load' | 'crop' | 'filter' | 'final'

export const CreatePost: FC<PropsType> = ({ onClose }) => {
	const [flag, setFlag] = useState<FlagType>('load')
	const [isActiveNotify, setIsActiveNotify] = useState(false)

	const flagChangeHandler = (flag: FlagType) => {
		setFlag(flag)
	}

	const onNotify = () => {
		setIsActiveNotify(true)
	}

	const onCloseNotify = () => {
		setIsActiveNotify(false)
	}

	const onCloseCreatePost = () => {
		setIsActiveNotify(false)
		onClose()
	}

	const router = useRouter()

	const t = router.locale === 'en' ? en : ru

	return (
		<>
			<Popup onClose={flag === 'load' ? onClose : onNotify }>
				<div className={s.container}>
					{flag === 'load' ? (
						<AddPhoto onClose={onClose} setFlag={flagChangeHandler} />
					) : flag === 'crop' ? (
						<CropEasy setFlag={flagChangeHandler} />
					) : flag === 'filter' ? (
						<AddFilters setFlag={flagChangeHandler} />
					) : flag === 'final' ? (
						<AddPublication onClose={onClose} setFlag={flagChangeHandler} />
					) : (
						<div>ooops, something was wrong</div>
					)}
				</div>
			</Popup>
			{isActiveNotify && <Popup onClose={onCloseNotify}>
				<TitlePopup title={t.close} onClose={onCloseNotify}/>
				<div className={s.notify}>
					<span>{t.confirmClose}</span>
					<div className={s.btns}>
						<Button style='opacity' title={t.no} callback={onCloseNotify}/>
						<Button title={t.yes} callback={onCloseCreatePost}/>
					</div>
				</div>
			</Popup>}

		</>
	)
}
