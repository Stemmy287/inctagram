import React from 'react'
import Image from 'next/image'
import s from './Avatar.module.scss'
import defaultAva from '../../../../../../public/images/defaultPhoto.png'
import { useFetchProfileQuery } from '../../../profileApi/profileApi'

type PropsType = {
	small?: boolean
}

export const Avatar = ({ small }: PropsType) => {
	const { data } = useFetchProfileQuery(null)

	return (
		<div className={s.container}>
			{!!data?.avatars.length ? (
				<Image
					src={data.avatars[0].url}
					alt={'avatar'}
					width={small ? 36 : 192}
					height={small ? 36 : 192}
					className={s.avatarFromServer}
				/>
			) : (
				<div className={s.borderDefault}>
					<Image
						src={defaultAva}
						alt={'default ava'}
						height={small ? 36 : 192}
						width={small ? 36 : 192}
					/>
				</div>
			)}
		</div>
	)
}
