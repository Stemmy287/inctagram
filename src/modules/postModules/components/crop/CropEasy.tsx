import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '@/modules/postModules/components/crop/cropImage'
import arrowBack from 'public/icons/arrow-ios-back.svg'
import { FlagType } from '@/modules/postModules/components/createPost/CreatePost'
import { useAppSelector } from '@/assets/hooks/useAppSelector'
import { selectUrlOriginalPics } from '@/modules/postModules/postReducer/postReducer-selector'
import { useAppDispatch } from '@/assets/hooks/useAppDispatch'
import { postActions } from '@/modules/postModules/postReducer/postReducer'
import Image from 'next/image'
import s from './CropEasy.module.scss'
import expand from 'public/icons/expand.svg'
import image from 'public/icons/image.svg'
import maximize from 'public/icons/maximize.svg'
import { Area } from 'react-easy-crop/types'

interface CropEasyProps {
	setFlag: (flag: FlagType) => void
	title: string
	btn: string
}

export const CropEasy: React.FC<CropEasyProps> = ({ setFlag, title, btn }) => {
	const photoURL = useAppSelector(selectUrlOriginalPics)
	const dispatch = useAppDispatch()

	const [editPhoto, setEditPhoto] = useState(false)
	const [openModal, setOpenModal] = useState(false)
	const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
		width: number
		height: number
		x: number
		y: number
	} | null>(null)

	const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
		setCroppedAreaPixels(croppedAreaPixels)
		// ширина высота
		console.log(croppedAreaPixels)
	}

	const onCropChange = (crop: { x: number; y: number }) => {
		setCrop(crop)
	}

	const onZoomChange = (zoom: number) => {
		setZoom(zoom)
	}

	const editPhotoHandler = () => {
		setEditPhoto(!editPhoto)
		setCrop({ x: 0, y: 0 })
		setZoom(1)
	}

	const openModalHandler = () => {
		setOpenModal(!openModal)
	}

	const cropImage = async () => {
		const res = await getCroppedImg(photoURL, croppedAreaPixels)
		if (res) {
			dispatch(postActions.setUrlCroppedPics({ urlCroppedPics: res.url }))
			dispatch(postActions.setCroppedPics({ croppedPics: res.file as File }))
			setFlag('filter')
		}
	}

	return (
		<div>
			<div className={s.header}>
				<Image src={arrowBack} alt={'back button'} />
				<div>{title}</div>
				<button onClick={cropImage} className={s.btn}>
					{btn}
				</button>
			</div>
			<div>
				<div className={s.wrapper}>
					<Cropper
						image={photoURL}
						showGrid={false}
						crop={crop}
						zoom={zoom}
						aspect={1}
						onZoomChange={onZoomChange}
						onCropChange={onCropChange}
						onCropComplete={onCropComplete}
					/>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						width: '40%',
						zIndex: 99,
						position: 'absolute'
					}}
				>
					{editPhoto && (
						<div className={s.inp}>
							<input
								type='range'
								min={1}
								max={3}
								step={0.1}
								value={zoom}
								onChange={e => onZoomChange(parseFloat(e.target.value))}
							/>
						</div>
					)}
					{openModal && (
						<div className={s.modal}>
							<div className={s.modalMain}>
								Оригинал
								<Image src={image} alt={'image'} width={24} height={24} />
							</div>
							<div className={s.modalMain}>1:1</div>
							<div className={s.modalMain}>4:5</div>
							<div className={s.modalMain}>16:9</div>
						</div>
					)}
					<div
						style={{
							display: 'flex',
							position: 'relative',
							bottom: 55,
							left: 20
						}}
					>
						<Image
							src={expand}
							alt={'expand'}
							className={s.buttonChange}
							onClick={openModalHandler}
						/>
						<Image
							src={maximize}
							alt={'maximize'}
							className={s.buttonChange}
							onClick={editPhotoHandler}
							style={{ marginLeft: '20px' }}
						/>
					</div>
					<Image
						src={image}
						alt={'image'}
						className={s.buttonChange}
						style={{ position: 'relative', bottom: 55 }}
					/>
				</div>
			</div>
		</div>
	)
}
