import { GeneralInformation } from '@/modules/profileModules/createProfile/GeneralInformation'
import { UploadImage } from '@/modules/profileModules/uploadImage/UploadImage'
import s from './ProfileSettings.module.scss'
import { AddAvatar } from '@/modules/profileModules/uploadImage/AddAvatar'
import { EditAvatar } from '@/modules/profileModules/createProfile/ProfileSettings/EditAvatar'

export const ProfileSettings = () => {

	return (
		<div className={s.container}>
			<EditAvatar/>
			<GeneralInformation/>
		</div>
	)
}

