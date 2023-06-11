import React, { PropsWithChildren, useState } from 'react'
import { NextPage } from 'next'
import s from './AddFilters.module.scss'
import Image from 'next/image'
import { filters_set } from 'modules/postModules/filters-set'
import { FlagType } from 'modules/postModules/components/createPost/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from 'store/store'
import { postActions } from 'modules/postModules/postReducer/postReducer'

import { setImageFilter } from 'assets/utils/setImageFilter/setImageFilter'
import { HeaderForModal } from 'modules/postModules'

export const AddFilters: NextPage<PropsType & PropsWithChildren> = ({ setFlag }) => {
	const dispatch = useDispatch()
	const croppedPics = useSelector<AppRootStateType, File>(state => state.postReducer.croppedPics)
	const urlCroppedPics = useSelector<AppRootStateType, string>(
		state => state.postReducer.urlCroppedPics
	)

	const [filter, setFilter] = useState('none')

	const handleImageSubmit = async () => {
		const res = await setImageFilter(croppedPics, filter)
		if (res) {
			dispatch(postActions.setFilteredPics({ filteredPics: res.file as File }))
			dispatch(postActions.setUrlFilteredPics({ urlFilteredPics: res.url }))
			setFlag('final')
		}
	}

	const clickBackHandler = () => {
		setFlag('crop')
	}

	return (
		<div className={s.container}>
			<HeaderForModal
				title={'Filters'}
				btnTitle={'Next'}
				callBack={handleImageSubmit}
				clickBack={clickBackHandler}
			/>
			<div className={s.filtersContainer}>
				<Image
					src={urlCroppedPics}
					alt={'picture'}
					width={486}
					height={500}
					style={{ filter: filter, objectFit: 'cover' }}
				/>
				<div className={s.filters}>
					{filters_set.map(el => (
						<div key={el.id} className={s.filter} onClick={() => setFilter(el.filter)}>
							<Image
								src={urlCroppedPics}
								alt={el.filterTitle}
								style={{ filter: el.filter }}
								width={108}
								height={108}
							/>
							<div style={{ marginTop: '6px' }}>{el.filterTitle}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

type PropsType = {
	setFlag: (flag: FlagType) => void
}
