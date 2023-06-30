import { getLayoutM } from 'components/Layout/MainLayout/MainLayout'
import React from 'react'
import {
	ProfileSettingsInformation
} from 'modules/profileModules/profileSettingsInformationModule/components/ProfileSettingsInformation/ProfileSettingsInformation'


const ProfileSettingsInformationPage = () => <ProfileSettingsInformation />

ProfileSettingsInformationPage.getLayout = getLayoutM
export default ProfileSettingsInformationPage