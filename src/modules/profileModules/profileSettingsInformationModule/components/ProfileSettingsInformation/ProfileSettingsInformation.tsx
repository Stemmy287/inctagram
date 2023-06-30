import s from './ProfileSettingsInformation.module.scss'
import { EditAvatar } from '../EditAva/EditAvatar'
import { SettingsNavBar } from '../../../../../components/SettingsNavBar/SettingsNavBar'
import { useFetchProfileQuery } from '../../../profileApi/profileApi'
import { GeneralInformation } from '../GeneralInformation/GeneralInformation'

export const ProfileSettingsInformation = () => {
	const {} = useFetchProfileQuery(null)

	return (
		<>
			<SettingsNavBar />
			<div className={s.wrapper}>
				<EditAvatar />
				<GeneralInformation />
			</div>
		</>
	)
}
