import React from 'react'
import s from './Profile.module.scss'
import Image from 'next/image'
import defaultPhoto from 'public/images/defaultPhoto.png'
import { Button } from '@/components/Button/Button'
import { SocialInfo } from '@/components/SocialInfo/SocialInfo'
import { useFetchProfileQuery } from '@/modules/profileModules/profileApi/profileApi'
import { useRouter } from 'next/router'
import { PostsList } from '@/modules/profileModules/profileModule/components/PostsList/PostsList'

export const Profile = () => {
	const { data: profile } = useFetchProfileQuery()

	const router = useRouter()
	const toSettingsHandler = () => {
		router.push('/profile/settings')
	}

	return (
		<div className={s.container}>
			<div className={s.hatProfile}>
				<Image className={s.avatar} src={defaultPhoto} alt='avatar' />
				<div className={s.mainInfo}>
					<div className={s.userNameAndBtn}>
						<h3>{profile?.userName}</h3>
						<div className={s.buttonWrapper}>
							<Button title='Profile Settings' callback={toSettingsHandler} white />
						</div>
					</div>
					<div className={s.socialInfo}>
						<SocialInfo count={'2305'} title={'Subscribers'} />
						<SocialInfo count={'2305'} title={'Subscribers'} />
						<SocialInfo count={'2305'} title={'Subscribers'} />
					</div>
					<span className={s.description}>{profile?.aboutMe || 'tell us about yourself!'}</span>
				</div>
			</div>
			<PostsList profileId={profile?.id || 0} />
		</div>
	)
}
