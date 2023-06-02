import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '@/modules/postModules/components/crop/cropImage'
import { TitlePopup } from '@/components/TitlePopup/TitlePopup'
import { FlagType } from '@/modules/postModules/components/createPost/CreatePost'
import { useAppSelector } from '@/assets/hooks/useAppSelector'
import { selectUrlOriginalPics } from '@/modules/postModules/postReducer/postReducer-selector'
import { useAppDispatch } from '@/assets/hooks/useAppDispatch'
import { postActions } from '@/modules/postModules/postReducer/postReducer'

interface CropEasyProps {
	setFlag: (flag: FlagType) => void
}

const CropEasy: React.FC<CropEasyProps> = ({ setFlag }) => {
	const photoURL = useAppSelector(selectUrlOriginalPics)
	const dispatch = useAppDispatch()

	const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
		width: number
		height: number
		x: number
		y: number
	} | null>(null)

	const onCropComplete = (
		croppedArea: { width: number; height: number; x: number; y: number },
		croppedAreaPixels: { width: number; height: number; x: number; y: number }
	) => {
		setCroppedAreaPixels(croppedAreaPixels)
	}

	const onCropChange = (crop: { x: number; y: number }) => {
		setCrop(crop)
	}

	const onZoomChange = (zoom: number) => {
		setZoom(zoom)
	}

	const cropImage = async () => {
		// @ts-ignore
		const { file, url } = await getCroppedImg(photoURL, croppedAreaPixels)
		dispatch(postActions.setUrlCroppedPics({ urlCroppedPics: url }))
		dispatch(postActions.setCroppedPics({ croppedPics: file }))
		setFlag('filter')
	}

	const zoomPercent = (value: number) => {
		return `${Math.round(value * 100)}%`
	}

	return (
		<>
			<TitlePopup title={'Cropping'} onClose={() => {}} />
			<div
				style={{
					background: '#333',
					position: 'relative',
					height: 400,
					width: 'auto',
					minWidth: 400
				}}
			>
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
			<div style={{ display: 'flex', flexDirection: 'column', margin: '16px' }}>
				<div style={{ marginBottom: '16px' }}>
					<label>Zoom: {zoomPercent(zoom)}</label>
					<input
						type='range'
						min={1}
						max={3}
						step={0.1}
						value={zoom}
						onChange={e => onZoomChange(parseFloat(e.target.value))}
					/>
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<button onClick={cropImage}>Crop</button>
				</div>
			</div>
		</>
	)
}

export default CropEasy
