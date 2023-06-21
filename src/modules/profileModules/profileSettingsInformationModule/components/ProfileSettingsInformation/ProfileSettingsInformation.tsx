import { GeneralInformation } from 'modules/profileModules/profileSettingsInformationModule/components/GeneralInformation/GeneralInformation'
import s from './ProfileSettingsInformation.module.scss'
import { EditAvatar } from '../EditAva/EditAvatar'
import { SettingsNavBar } from '../../../../../components/SettingsNavBar/SettingsNavBar'
import { useFetchProfileQuery } from '../../../profileApi/profileApi'

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
