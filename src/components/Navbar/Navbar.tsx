import { useLocation, useNavigate } from 'react-router-dom';
import { type CSSProperties } from 'react';
import { isMobile } from '../../utils.ts';
import './Navbar.css';
import Home from '../../icons/home_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import Group from '../../icons/group_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import Payments from '../../icons/payments_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import More from '../../icons/more_horiz_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import SmartNavLink from './SmartNavLink/SmartNavLink.tsx';

interface Props {
    navbarHeight: string;
}

const links = [
    {
        path: '/',
        title: 'Главная',
        icon: <Home />,
    },
    {
        path: '/group',
        title: 'Группы',
        icon: <Group />,
    },
    {
        path: '/expenses',
        title: 'Расходы',
        icon: <Payments />,
    },
    {
        path: '/lists',
        title: 'Ещё',
        icon: <More />,
    },
];

export default function Navbar({ navbarHeight }: Props) {
    const isMobileView = isMobile();

    const navStyles: CSSProperties = {
        height: navbarHeight,
        top: isMobileView ? undefined : '0',
        bottom: isMobileView ? '0' : undefined,
    };

    const navigate = useNavigate();
    const currentPath = useLocation().pathname;

    return (
        <nav
            className={'navbar__container'}
            style={navStyles}
        >
            {
                links.map((link, index) => (
                    <SmartNavLink
                        key={index}
                        path={link.path}
                        currentPath={currentPath}
                        title={link.title}
                        icon={link.icon}
                        onClick={() => void navigate(link.path)}
                        isMobileView={isMobileView}
                    />
                ))
            }
        </nav>
    );
}
