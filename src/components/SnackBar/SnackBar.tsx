import React, { useEffect } from 'react'
import warningIcon from '../../../public/icons/warning.svg'
import closeIcon from '../../../public/icons/close.svg'
import Image from 'next/image'
import s from './SnackBar.module.scss'
import { useAppSelector } from 'assets/hooks/useAppSelector'
import { useAppDispatch } from 'assets/hooks/useAppDispatch'
import { appActions } from 'modules/appModules/appReducer'

export const SnackBar = () => {
	const error = useAppSelector<string | null>(state => state.app.error)
	const dispatch = useAppDispatch()

	const onClose = () => {
		dispatch(appActions.setAppError({ error: null }))
	}

	useEffect(() => {
		const id = setTimeout(() => {
			onClose()
		}, 5000)
		return () => {
			clearTimeout(id)
		}
	})

	return (
		<div className={s.error}>
			<Image src={warningIcon} alt='warning icon' />
			<span>{error}</span>
			<div className={s.close_error_bar} onClick={onClose}>
				<Image src={closeIcon} alt='close icon' />
			</div>
		</div>
	)
}
