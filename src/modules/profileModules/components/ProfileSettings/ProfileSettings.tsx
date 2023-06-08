import { GeneralInformation } from 'modules/profileModules/components/GenerallInformation/GeneralInformation'
import s from './ProfileSettings.module.scss'
import { EditAvatar } from '../EditAva/EditAvatar'

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
