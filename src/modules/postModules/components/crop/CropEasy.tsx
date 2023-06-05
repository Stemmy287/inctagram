import React, { FC, useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '@/assets/utils/cropImage/cropImage'
import { FlagType } from '@/modules/postModules/components/createPost/CreatePost'
import { useAppSelector } from '@/assets/hooks/useAppSelector'
import {
	selectOriginalPics,
	selectUrlOriginalPics
} from '@/modules/postModules/postReducer/postReducer-selector'
import { useAppDispatch } from '@/assets/hooks/useAppDispatch'
import { postActions } from '@/modules/postModules/postReducer/postReducer'
import s from './CropEasy.module.scss'
import { Area } from 'react-easy-crop/types'
import { getImageDimensions } from '@/assets/utils/getImageDimensions/getImageDimensions'
import { CropPhotoComponent } from './CropPhoto/CropPhotoComponent'
import { HeaderForModal } from '@/modules/postModules/components/headerForModal/HeaderForModal'

type PropsType = {
	setFlag: (flag: FlagType) => void
}

export type SizeType = {
	width: number
	height: number
}

type CropType = {
	x: number
	y: number
}

export const CropEasy: FC<PropsType> = ({ setFlag }) => {
	const photoURL = useAppSelector(selectUrlOriginalPics)
	const pics = useAppSelector(selectOriginalPics)
	const dispatch = useAppDispatch()

	const [croppedAreaPixels, setCroppedAreaPixels] = useState<(SizeType & CropType) | null>(null)
	const [currentSize, setCurrentSize] = useState<SizeType>({ height: 1, width: 1 })
	const [originalSize, setOriginalSize] = useState<SizeType>({} as SizeType)
	const [crop, setCrop] = useState<CropType>({ x: 0, y: 0 })
	const [editPhoto, setEditPhoto] = useState(false)
	const [openMenu, setOpenMenu] = useState(false)
	const [zoom, setZoom] = useState(1)

	const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
		setCroppedAreaPixels(croppedAreaPixels)
	}

	const onCropChange = (crop: CropType) => {
		setCrop(crop)
	}

	const onZoomChange = (zoom: number) => {
		setZoom(zoom)
	}

	const editPhotoHandler = () => {
		setEditPhoto(!editPhoto)
		setCrop({ x: 0, y: 0 })
		setZoom(1)
		if (openMenu) {
			setOpenMenu(false)
		}
	}

	const openModalHandler = () => {
		setOpenMenu(!openMenu)
		if (editPhoto) {
			setEditPhoto(false)
		}
	}

	const cropImage = async () => {
		const res = await getCroppedImg(photoURL, croppedAreaPixels)
		if (res) {
			dispatch(postActions.setUrlCroppedPics({ urlCroppedPics: res.url }))
			dispatch(postActions.setCroppedPics({ croppedPics: res.file as File }))
			setFlag('filter')
		}
	}

	const originalPic = () => {
		setZoom(1)
		setCurrentSize(originalSize)
	}

	useEffect(() => {
		getImageDimensions(pics).then(res => {
			setOriginalSize({ width: res.width, height: res.height })
			setCurrentSize({ width: res.width, height: res.height })
		})
	}, [pics])

	return (
		<div>
			<HeaderForModal
				title={'Cropping'}
				callBack={cropImage}
				btnTitle={'Next'}
				clickBack={() => setFlag('load')}
			/>
			<div className={s.wrapper}>
				<Cropper
					image={photoURL}
					showGrid={false}
					crop={crop}
					zoom={zoom}
					aspect={currentSize.width / currentSize.height}
					onZoomChange={onZoomChange}
					onCropChange={onCropChange}
					onCropComplete={onCropComplete}
				/>
			</div>
			<CropPhotoComponent
				editPhoto={editPhoto}
				openMenu={openMenu}
				zoom={zoom}
				setZoom={setZoom}
				editPhotoHandler={editPhotoHandler}
				openModalHandler={openModalHandler}
				originalPic={originalPic}
				setCurrentSize={setCurrentSize}
			/>
		</div>
	)
}
