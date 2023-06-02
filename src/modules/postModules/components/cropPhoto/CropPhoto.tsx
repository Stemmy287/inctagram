import React, { FC, useCallback, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import s from './crop.module.scss'

type PropsType = {
	img: string
}

export const CropPhoto: FC<PropsType> = ({ img }) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)

	const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
		console.log(croppedArea, croppedAreaPixels)
	}, [])

	return (
		<Cropper
			image={img}
			crop={crop}
			zoom={zoom}
			aspect={1 / 2}
			onCropChange={setCrop}
			onCropComplete={onCropComplete}
			onZoomCha