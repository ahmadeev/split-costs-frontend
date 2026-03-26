import { type CSSProperties } from 'react';
import { isMobile } from '../../utils.ts';
import './Navbar.css';
import HomeIcon from '../../icons/home_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import Group from '../../icons/group_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import Payments from '../../icons/payments_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import More from '../../icons/more_horiz_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import SmartNavLink from './SmartNavLink/SmartNavLink.tsx';

interface Props {
    navbarHeight: string;
}

const links = [
    {
        to: '/',
        title: 'Главная',
        getIcon: (active: boolean) => (
            <HomeIcon style={{ fill: active ? 'var(--color)' : 'var(--secondary-color)' }} />
        ),
    },
    {
        to: '/group',
        title: 'Группы',
        getIcon: (active: boolean) => (
            <Group style={{ fill: active ? 'var(--color)' : 'var(--secondary-color)' }} />
        ),
    },
    {
        to: '/expenses',
        title: 'Расходы',
        getIcon: (active: boolean) => (
            <Payments style={{ fill: active ? 'var(--color)' : 'var(--secondary-color)' }} />
        ),
    },
    {
        to: '/lists',
        title: 'Ещё',
        getIcon: (active: boolean) => (
            <More style={{ fill: active ? 'var(--color)' : 'var(--secondary-color)' }} />
        ),
    },
];

export default function Navbar({ navbarHeight }: Props) {
    const isMobileView = isMobile();

    const navStyles: CSSProperties = {
        height: navbarHeight,
        top: isMobileView ? undefined : '0',
        bottom: isMobileView ? '0' : undefined,
    };

    return (
        <nav
            className={'navbar__container'}
            style={navStyles}
        >
            {
                links.map((link, index) => (
                    <SmartNavLink
                        key={index}
                        to={link.to}
                        title={link.title}
                        icon={link.getIcon}
                        isMobileView={isMobileView}
                    />
                ))
            }
        </nav>
    );
}
