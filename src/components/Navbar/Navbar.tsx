import s from './Navbar.module.scss'
import Image from 'next/image';
import homeIcon from '/public/icons/home.svg'
import addIcon from '/public/icons/plus-square.svg'
import userIcon from '/public/icons/user.svg'
import Link from 'next/link';
import {LogoutButton} from '@/components/Button/LogoutButton/LogoutButton';

const navData = [
    {id: 1, title: 'Home', icon: homeIcon, href: '/home', alt: 'home-page'},
    {id: 2, title: 'Create', icon: addIcon, href: 'create', alt: 'create-page'},
    {id: 3, title: 'My profile', icon: userIcon, href: '/profile', alt: 'profile-page'},
]

export const Navbar = () => {

    return (
        <div className={s.navWrapper}>
            <div className={s.navbar}>
                {
                    navData && navData.map(i => <Link key={i.id} className={s.link} href={i.href}>
                        <Image className={s.icon} src={i.icon} alt={i.alt}/>
                        <div className={s.title}> {i.title}</div>
                    </Link>)
                }
                <div className={s.outButton}>
                    <LogoutButton/>
                </div>
            </div>
        </div>
    )
}