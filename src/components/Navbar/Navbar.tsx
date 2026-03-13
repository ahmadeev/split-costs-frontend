import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { cloneElement, type CSSProperties, type ReactElement, type ReactNode, useCallback } from 'react';
import { isMobile } from '../../utils.ts';
import './Navbar.css';
import Home from '../../icons/home_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import Group from '../../icons/group_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import Payments from '../../icons/payments_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import More from '../../icons/more_horiz_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';

interface Props {
    navbarHeight: string;
}

const getActiveLinkStyles = (isActive: boolean): CSSProperties => {
    return isActive ? { textDecoration: 'underline' } : { textDecoration: 'none' };
};

export default function Navbar({ navbarHeight }: Props) {
    const isMobileView = isMobile();

    const navStyles: CSSProperties = {
        height: navbarHeight,
        top: isMobileView ? undefined : '0',
        bottom: isMobileView ? '0' : undefined,
    };

    const navigate = useNavigate();
    const currentPath = useLocation().pathname;

    const getNavItem = useCallback((path: string, title: string, icon: ReactNode) => {
        const styledIcon = icon && cloneElement(icon as ReactElement<{ style?: CSSProperties}>, {
            style: {
                fill: currentPath === path ? 'var(--color)' : 'var(--secondary-color)',
            },
        });

        return (
            <div
                className={'navbar__nav-item'}
                onClick={() => void navigate(path)}
            >
                {styledIcon}
                {!isMobileView &&
                    <NavLink to={path} style={({ isActive }) => getActiveLinkStyles(isActive)}>{title}</NavLink>}
            </div>
        );
    }, [currentPath, isMobileView, navigate]);

    return (
        <nav
            className={'navbar__container'}
            style={navStyles}
        >
            {getNavItem('/', 'Главная', <Home />)}
            {getNavItem('/group', 'Группа', <Group />)}
            {getNavItem('/expenses', 'Расходы', <Payments />)}
            {getNavItem('/lists', 'Ещё', <More />)}
        </nav>
    );
}
