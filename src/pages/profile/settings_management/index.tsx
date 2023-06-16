import { getLayoutM } from 'components/Layout/MainLayout/MainLayout'
import React from 'react'
import {
	ProfileSettingManagement
} from '../../../modules/profileModules/profileSettingManagementModule/components/ProfileSettingManagement/ProfileSettingManagement'

const ProfileSettingsManagementPage = () => <ProfileSettingManagement/>

ProfileSettingsManagementPage.getLayout = getLayoutM
export default ProfileSettingsManagementPage