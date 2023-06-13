import {
	GeneralInformation
} from 'modules/profileModules/profileSettingsModule/components/GeneralInformation/GeneralInformation'
import s from './ProfileSettings.module.scss'
import { EditAvatar } from '../EditAva/EditAvatar'

export const ProfileSettings = () => {
	return (
		<div className={s.wrapper}>
			<EditAvatar />
			<GeneralInformation />
		</div>
	)
}
