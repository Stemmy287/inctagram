import { Popup } from 'components/Popup/Popup'
import { FC, useState } from 'react'
import { AddFilters } from '../addFilters/AddFilters'
import { AddPhoto } from '../addPhoto/AddPhoto'
import { AddPublication } from '../addPublication/AddPublication'
import { CropEasy } from '../crop/CropEasy'
import s from './CreatePost.module.scss'

type PropsType = {
	onClose: () => void
}
export type FlagType = 'load' | 'crop' | 'filter' | 'final'

export const CreatePost: FC<PropsType> = ({ onClose }) => {
	const [flag, setFlag] = useState<FlagType>('load')

	const flagChangeHandler = (flag: FlagType) => {
		setFlag(flag)
	}

	return (
		<Popup onClose={onClose}>
			<div className={s.container}>
				{flag === 'load' ? (
					<AddPhoto onClose={onClose} setFlag={flagChangeHandler} />
				) : flag === 'crop' ? (
					<CropEasy setFlag={flagChangeHandler} />
				) : flag === 'filter' ? (
					<AddFilters setFlag={flagChangeHandler} />
				) : flag === 'final' ? (
					<AddPublication onClose={onClose} />
				) : (
					<div>ooops, something was wrong</div>
				)}
			</div>
		</Popup>
	)
}
