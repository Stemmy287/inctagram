import { GeneralInformation } from '@/modules/profileModules/createProfile/GeneralInformation'
import { UploadImage } from '@/modules/profileModules/uploadImage/UploadImage'
import s from './ProfileSettings.module.scss'

export const ProfileSettings = () => {

	return (
		<div className={s.container}>
			<UploadImage />
			<GeneralInformation/>
		</div>
	)
}

