import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {useAppSelector} from '@/assets/hooks/useAppSelector'
import {loggedIn} from '@/modules/authModules/authReducer/authSelectors'
import {getLayoutM} from '@/components/Layout/MainLayout/MainLayout';
import { GeneralInformation } from '@/modules/profileModules/createProfile/GeneralInformation'
import { useGetUserQuery } from '@/modules/profileModules/createProfile/createProfileApi'
import { UploadImage } from '@/modules/profileModules/uploadImage/UploadImage'

const Profile = () => {

    const  {} = useGetUserQuery()

    const isLoggedIn = useAppSelector(loggedIn)

    const router = useRouter()

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/auth/login')
        }
    }, [isLoggedIn, router])


    return (
        <div>
            <GeneralInformation/>
            {/*{JSON.stringify(data)}*/}
            <UploadImage />
        </div>
    )
}

Profile.getLayout = getLayoutM
export default Profile