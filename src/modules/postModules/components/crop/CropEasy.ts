import { Cancel, Crop } from '@mui/icons-material'
import { Box, Button, DialogActions, DialogContent, Slider, Typography } from '@mui/material'
import React, { useState } from 'react'
import Cropper, { CroppedAreaPixels, Rotation } from 'react-easy-crop'
import { useAuth } from '../../context/AuthContext'
import getCroppedImg from './utils/cropImage'

interface CropEasyProps {
	photoURL: string
	setOpenCrop: React.Dispatch<React.SetStateAction<boolean>>
	setPhotoURL: React.Dispatch<React.SetStateAction<string>>
	setFile: React.Dispatch<React.SetStateAction<Blob | null>>
}

const CropEasy: React.FC<CropEasyProps> = ({ photoURL, setOpenCrop, setPhotoURL, setFile }) => {
	const { setAlert, setLoading } = useAuth()
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [rotation, setRotation] = useState<Rotation>(0)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null)

	const cropComplete = (croppedArea: CroppedAreaPixels, croppedAreaPixels: CroppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels)
	}

	const cropImage = async () => {
		setLoading(true)
		try {
			const croppedImg = await getCroppedImg(photoURL, croppedAreaPixels!, rotation)
			if (croppedImg) {
				const { file, url } = croppedImg
				setPhotoURL(url)
				setFile(file)
				setOpenCrop(false)
			}
		} catch (error) {
			setAlert({
				isAlert: true,
				severity: 'error',
				message: error.message,
				timeout: 5000,
				location: 'modal'
			})
			console.log(error)
		}

		setLoading(false)
	}
	return (
		<>
			<DialogContent
				dividers
				sx={{
					background: '#333',
					position: 'relative',
					height: 400,
					width: 'auto',
					minWidth: { sm: 500 }
				}}
			>
				<Cropper
					image={photoURL}
					crop={crop}
					zoom={zoom}
					rotation={rotation}
					aspect={1}
					onZoomChange={setZoom}
					onRotationChange={setRotation}
					onCropChange={setCrop}
					onCropComplete={cropComplete}
				/>
			</DialogContent>
			<DialogActions sx={{ flexDirection: 'column', mx: 3, my: 2 }}>
				<Box sx={{ width: '100%', mb: 1 }}>
					<Box>
						<Typography>Zoom: {zoomPercent(zoom)}</Typography>
						<Slider
							valueLabelDisplay='auto'
							valueLabelFormat={zoomPercent}
							min={1}
							max={3}
							step={0.1}
							value={zoom}
							onChange={(e, zoom) => setZoom(zoom)}
						/>
					</Box>
					<Box>
						<Typography>Rotation: {rotation + '°'}</Typography>
						<Slider
							valueLabelDisplay='auto'
							min={0}
							max={360}
							value={rotation}
							onChange={(e, rotation) => setRotation(rotation)}
						/>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						gap: 2,
						flexWrap: 'wrap'
					}}
				>
					<Button variant='outlined' startIcon={<Cancel />} onClick={() => setOpenCrop(false)}>
						Cancel
					</Button>
					<Button variant='contained' startIcon={<Crop />} onClick={cropImage}>
						Crop
					</Button>
				</Box>
			</DialogActions>
		</>
	)
}

export default CropEasy

const zoomPercent = (value: number) => {
	return `${Math.round(value * 100)}%`
}
