import React from 'react'
import s from './Profile.module.scss'
import { useRouter } from 'next/router'
import { useFetchProfileQuery } from '../../../profileApi/profileApi'
import { Button } from '../../../../../components/Button/Button'
import { SocialInfo } from '../../../../../components/SocialInfo/SocialInfo'
import { PostsList } from '../PostsList/PostsList'
import { useAppSelector } from '../../../../../assets/hooks/useAppSelector'
import { loggedIn } from '../../../../authModules'
import { Avatar } from '../../../profileSettingsInformationModule/components/Avatar/Avatar'

export const Profile = () => {
	const isLoggedIn = useAppSelector(loggedIn)
	const {data} = useFetchProfileQuery(null, { skip: !isLoggedIn })

	const router = useRouter()

	const toSettingsHandler = () => {
		router.push('/profile/settings_information')
	}

	return (
		<>
			<div className={s.hatProfile}>
				<Avatar />
				<div className={s.mainInfo}>
					<div className={s.userNameAndBtn}>
						<h3>{data?.userName}</h3>
						<div className={s.buttonWrapper}>
							<Button title='Profile Settings' callback={toSettingsHandler} style={'white'} />
						</div>
					</div>
					<div className={s.socialInfo}>
						<SocialInfo count={'1234'} title={'Subscriptions'} />
						<SocialInfo count={'3214'} title={'Subscribers'} />
						<SocialInfo count={'2571'} title={'Publications'} />
					</div>
					<span className={s.description}>{data?.aboutMe || 'tell us about yourself!'}</span>
				</div>
			</div>
			<PostsList profileId={data?.id || 0} />
		</>
	)
}
