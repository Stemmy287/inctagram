import { FC, useRef, useState } from 'react'
import s from './BurgerMenu.module.scss'
import postMenu from '../../../public/icons/more-horizontal-outline.svg'
import trash from '../../../public/icons/trash-outline.svg'
import edit from '../../../public/icons/edit-2-outline.svg'
import Image from 'next/image'
import useOnClickOutside from 'assets/hooks/useOnClickOutside'
import { useRouter } from 'next/router'
import { en } from '../../locales/en'
import { ru } from '../../locales/ru'

type PropsType = {
	onEditClick: () => void
	onDeleteClick: () => void
}

export const BurgerMenu: FC<PropsType> = ({ onEditClick, onDeleteClick }) => {
	const [showMenu, setShowMenu] = useState(false)

	const ref = useRef(null)
	useOnClickOutside(ref, () => setShowMenu(false), 'showMenu')

	const router = useRouter()

	const t = router.locale === 'en' ? en : ru

	const showMenuHandler = () => {
		setShowMenu(!showMenu)
	}

	return (
		<>
			<div className={s.container}>
				<Image
					src={postMenu}
					alt='postMenu'
					onClick={showMenuHandler}
					className={s.showmenu}
					id={'showMenu'}
				/>
				{showMenu && (
					<div className={s.menu} ref={ref}>
						<label className={s.action} onClick={onEditClick}>
							<Image src={edit} alt='edit' />
							<div className={s.btn}>{t.deletePost}</div>
						</label>
						<label className={s.action} onClick={onDeleteClick}>
							<Image src={trash} alt='trash' />
							<div className={s.btn}>{t.editPost}</div>
						</label>
					</div>
				)}
			</div>
		</>
	)
}
