import React from 'react'
import s from './Header.module.scss'
import {LoadingLine} from '@/components/LoadingLine/LoadingLine'
import {selectAppStatus, selectIsInitialized} from '@/modules/appModules'
import {useAppSelector} from '@/assets/hooks/useAppSelector'
import {LogoutButton} from '@/components/Button/LogoutButton/LogoutButton';

export const Header = () => {
    const isLoading = useAppSelector(selectAppStatus)
    const isInitialized = useAppSelector(selectIsInitialized)
    const isLoggedIn = useAppSelector(state => state.authReducer.isLoggedIn)



    return (
        <div className={s.header}>
            <h1 className={s.title}>Inctagram</h1>
            {isLoading === 'loading' && isInitialized && (
                <div className={s.loading}>
                    <LoadingLine/>
                </div>
            )}
            {isLoggedIn &&  // вставить нужное условие (типа isSettings)
                <div className={s.outButton}>
                <LogoutButton/>
                </div>
            }

        </div>
    )
}
