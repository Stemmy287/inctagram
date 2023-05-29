import React from 'react'
import s from './Profile.module.scss'
import Image from 'next/image'
import defaultPhoto from 'public/images/defaultPhoto.png'

export const Profile = () => {
	return (
		<div className={s.container}>
			<div className={s.hatProfile}>
				<Image className={s.avatar} src={defaultPhoto} alt='avatar' />
				<div className={s.mainInfo}>
					<div className={s.userNameAndBtn}>
						<h3>UserName</h3>
					</div>
					<div className={s.socialInfo}></div>
					<span className={s.description}></span>
				</div>
			</div>
			<div>PostsList</div>
		</div>
	)
}
