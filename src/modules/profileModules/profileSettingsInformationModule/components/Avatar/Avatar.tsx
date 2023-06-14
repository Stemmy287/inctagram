import React from 'react'
import { useAppSelector } from '../../../../../assets/hooks/useAppSelector'
import { selectUser } from '../../../profileReducer/profileReducer-selector'
import Image from 'next/image'
import s from './Avatar.module.scss'
import image from '../../../../../../public/icons/image.svg'


export const Avatar = () => {
	const avatarFromServer = useAppSelector(selectUser)?.avatars[0]?.url

	return (
		<div className={s.container}>
			{avatarFromServer
				?
				<Image src={avatarFromServer} alt={'avatar'} width={192} height={192} className={s.avatarFromServer} />
				:
				<div className={s.borderDefault}>
					<Image src={image} alt={'default ava'} height={42} width={42} />
				</div>}
		</div>
	)
}
