import React from 'react'
import { NextPageWithLayout } from '../_app'
import { Profile } from '../../modules/profileModules/profileModule/components/Profile/Profile'
import { getLayoutM } from '../../components/Layout/MainLayout/MainLayout'


const ProfilePage: NextPageWithLayout = () => <Profile />

ProfilePage.getLayout = getLayoutM
export default ProfilePage