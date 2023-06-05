import React, { FC, useState } from 'react'
import { Popup } from '@/components/Popup/Popup'
import s from './CreatePost.module.scss'
import { AddPhoto } from '@/modules/postModules/components/addPhoto/AddPhoto'
import { AddPublication } from '@/modules/postModules/components/addPublication/AddPublication'
import { AddFilters } from '@/modules/postModules/components/addFilters/AddFilters'
import { CropEasy } from '@/modules/postModules/components/crop/CropEasy'

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
