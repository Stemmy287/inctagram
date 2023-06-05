import expand from 'public/icons/expand.svg'
import image from 'public/icons/image.svg'
import maximize from 'public/icons/maximize.svg'
import rectangle1x1 from 'public/icons/Rectangle_1x1.svg'
import rectangle4x5 from 'public/icons/Rectangle_4x5.svg'
import rectangle16x9 from 'public/icons/Rectangle_16x9.svg'
import Image from 'next/image'
import s from './CropPhoto.module.scss'
import { FC } from 'react'
import { SizeType } from '../CropEasy'

type PropsType = {
	zoom: number
	openMenu: boolean
	editPhoto: boolean
	originalPic: () => void
	openModalHandler: () => void
	editPhotoHandler: () => void
	setZoom: (val: number) => void
	setCurrentSize: (data: SizeType) => void
}

export const CropPhotoComponent: FC<PropsType> = ({
	zoom,
	openMenu,
	editPhoto,
	setZoom,
	setCurrentSize,
	openModalHandler,
	editPhotoHandler,
	originalPic
}) => {
	const onZoomChange = (zoom: number) => {
		setZoom(zoom)
	}

	const rectanglePicHandler = (size: SizeType) => {
		setCurrentSize({ height: size.height, width: size.width })
	}

	return (
		<div className={s.editPhoto}>
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
			{openMenu && (
				<div className={s.modal}>
					<label className={s.modalMain} onClick={originalPic}>
						Оригинал
						<Image src={image} alt={'image'} className={s.image} />
					</label>
					<label
						className={s.modalMain}
						onClick={() => rectanglePicHandler({ height: 1, width: 1 })}
					>
						1:1
						<Image src={rectangle1x1} alt={'rectangle1x1'} className={s.image} />
					</label>
					<label
						className={s.modalMain}
						onClick={() => rectanglePicHandler({ height: 5, width: 4 })}
					>
						4:5
						<Image src={rectangle4x5} alt={'rectangle4x5'} className={s.image} />
					</label>
					<label
						className={s.modalMain}
						onClick={() => rectanglePicHandler({ height: 9, width: 16 })}
					>
						16:9
						<Image src={rectangle16x9} alt={'rectangle16x9'} className={s.image} />
					</label>
				</div>
			)}
			<div className={s.editButton}>
				<Image src={expand} alt={'expand'} className={s.buttonChange} onClick={openModalHandler} />
				<Image
					src={maximize}
					alt={'maximize'}
					className={`${s.buttonChange} ${s.maxi}`}
					onClick={editPhotoHandler}
				/>
			</div>
			<div className={s.editButton}>
				<Image src={image} alt={'image'} className={s.buttonChange} />
			</div>
		</div>
	)
}
