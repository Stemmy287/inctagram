import { GeneralInformation } from '@/modules/profileModules/profileSettingsModule/createProfile/GeneralInformation'
import s from './ProfileSettings.module.scss'
import { EditAvatar } from '@/modules/profileModules/profileSettingsModule/createProfile/ProfileSettings/EditAvatar'

export const ProfileSettings = () => {
	return (
		<div>
			<div className={s.wrapper}>
				<EditAvatar />
				<GeneralInformation />
			</div>
		</div>
	)
}
