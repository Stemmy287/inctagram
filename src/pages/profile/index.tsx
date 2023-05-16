import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {useAppSelector} from '@/assets/hooks/useAppSelector'
import {loggedIn} from '@/modules/authModules/authReducer/authSelectors'
import {getLayoutM} from '@/components/Layout/MainLayout/MainLayout';

const Profile = () => {

    const isLoggedIn = useAppSelector(loggedIn)

    const router = useRouter()

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('auth/login')
        }
    }, [isLoggedIn])


    return (
        <div>
            Profile
        </div>
    )
}

Profile.getLayout = getLayoutM
export default Profile