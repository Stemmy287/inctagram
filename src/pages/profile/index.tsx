import React from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { getLayoutM } from '@/components/Layout/MainLayout/MainLayout'
import { Profile } from '@/modules/profileModules/profileModule/components/Profile/Profile'

const ProfilePage: NextPageWithLayout = () => <Profile />

ProfilePage.getLayout = getLayoutM
export default ProfilePage