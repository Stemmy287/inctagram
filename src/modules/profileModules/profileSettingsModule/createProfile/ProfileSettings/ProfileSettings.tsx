import s from './ProfileSettings.module.scss'
import { EditAvatar } from '../../../components/EditAva/EditAvatar'
import { GeneralInformation } from '../../../components/GeneralInformation/GeneralInformation'

export const ProfileSettings = () => {
	return (
		<div className={s.wrapper}>
			<EditAvatar />
			<GeneralInformation />
		</div>
	)
}
