import s from './Navbar.module.scss'
import Image from 'next/image'
import homeIcon from '../../../public/icons/home.svg'
import addIcon from '../../../public/icons/plus-square.svg'
import userIcon from '../../../public/icons/user.svg'
import Link from 'next/link'
import { LogoutButton } from 'components/Button/LogoutButton/LogoutButton'
import { CreatePost } from 'modules/postModules/components/createPost/CreatePost'
import { useState } from 'react'

const navData = [
	{ id: 1, title: 'Home', icon: homeIcon, href: '/home', alt: 'home-page' },
	{ id: 2, title: 'Create', icon: addIcon, href: '', alt: 'create-page' },
	{ id: 3, title: 'My profile', icon: userIcon, href: '/profile', alt: 'profile-page' }
]
export const Navbar = () => {
	const [isActive, setIsActive] = useState(false)
	const onCloseHandler = () => {
		setIsActive(!isActive)
	}
	return (
		<>
			<div className={s.navWrapper}>
				<div className={s.navbar}>
					{navData &&
						navData.map(i => (
							<Link key={i.id} className={s.link} href={i.href} onClick={ i.id === 2 ? onCloseHandler : () => {}}>
								<Image className={s.icon} src={i.icon} alt={i.alt} />
								<div className={s.title}> {i.title}</div>
							</Link>
						))}
					<div className={s.outButton}>
						<LogoutButton />
					</div>
				</div>
			</div>
			{isActive && <CreatePost onClose={onCloseHandler} />}
		</>
	)
}
