import { getLayoutM } from 'components/Layout/MainLayout/MainLayout'
import {
	ProfileSettings
} from 'modules/profileModules/profileSettingsModule/components/ProfileSettings/ProfileSettings'

const ProfileSettingsPage = () => <ProfileSettings />

ProfileSettingsPage.getLayout = getLayoutM
export default ProfileSettingsPage