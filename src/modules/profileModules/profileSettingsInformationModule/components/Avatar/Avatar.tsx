import React from 'react'
import { useAppSelector } from '../../../../../assets/hooks/useAppSelector'
import { selectUser } from '../../../profileReducer/profileReducer-selector'
import Image from 'next/image'
import s from './Avatar.module.scss'
import defaultAva from '../../../../../../public/images/defaultPhoto.png'

type PropsType = {
	small?: boolean
}

export const Avatar = ({small}: PropsType) => {
	const avatarFromServer = useAppSelector(selectUser)?.avatars[0]?.url

	return (
		<div className={s.container}>
			{avatarFromServer
				?
				<Image
					src={avatarFromServer}
					alt={'avatar'}
					width={small ? 36 : 192}
					height={small ? 36 : 192}
					className={s.avatarFromServer}
				/>
				:
				<div className={s.borderDefault}>
					<Image src={defaultAva} alt={'default ava'} height={small ? 36 : 192} width={small ? 36 : 192} />
				</div>}
		</div>
	)
}
