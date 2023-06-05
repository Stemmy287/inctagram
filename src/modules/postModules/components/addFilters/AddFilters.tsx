import React, { PropsWithChildren, useState } from 'react'
import { NextPage } from 'next'
import s from './AddFilters.module.scss'
import arrowBack from 'public/icons/arrow-ios-back.svg'
import Image from 'next/image'
import { filters_set } from '@/modules/postModules/filters-set'
import { FlagType } from '@/modules/postModules/components/createPost/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '@/store/store'
import { newImage } from '@/modules/postModules/newImageInstance'
import { postActions } from '@/modules/postModules/postReducer/postReducer'
import { HeaderForModal } from '@/modules/postModules/components/headerForModal/HeaderForModal'

export const AddFilters: NextPage<PropsType & PropsWithChildren> = ({
	btn,
	title,
	children,
	setFlag
}) => {
	const dispatch = useDispatch()
	const croppedPics = useSelector<AppRootStateType, File>(state => state.postReducer.croppedPics)
	const urlCroppedPics = useSelector<AppRootStateType, string>(
		state => state.postReducer.urlCroppedPics
	)

	const [filter, setFilter] = useState('none')

	const handleImageSubmit = () => {
		if (croppedPics) {
			const img = newImage
			img.src = URL.createObjectURL(croppedPics)
			img.onload = () => {
				const originalWidth = img.naturalWidth
				const originalHeight = img.naturalHeight

				const canvas = document.createElement('canvas')
				const context = canvas.getContext('2d')

				if (context) {
					canvas.width = originalWidth
					canvas.height = originalHeight

					context.filter = filter

					context.drawImage(img, 0, 0, canvas.width, canvas.height)

					canvas.toBlob(blob => {
						if (blob) {
							const modifiedFile = new File([blob], 'file.name', { type: 'image/jpeg' })
							dispatch(postActions.setFilteredPics({ filteredPics: modifiedFile }))
							// console.log(modifiedFile)
						}
					})
					const newURL = canvas.toDataURL()
					// console.log(newURL)
					dispatch(postActions.setUrlFilteredPics({ urlFilteredPics: newURL }))
				}
			}
		}

		setFlag('final')
	}

	return (
		<div className={s.container}>
			<HeaderForModal
				title={'Filters'}
				btnTitle={'Next'}
				callBack={handleImageSubmit}
				clickBack={() => {}}
			/>
			<div className={s.filtersContainer}>
				{/*<Image src={pics} alt={'picture'} width={500} height={500} style={{ filter: filter }} />*/}
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
	title: string
	btn: string
	setFlag: (flag: FlagType) => void
}
