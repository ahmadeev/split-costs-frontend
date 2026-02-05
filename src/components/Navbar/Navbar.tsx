import { NavLink, useNavigate } from 'react-router-dom';
import { type CSSProperties, type ReactNode, useCallback } from 'react';
import { isMobile } from '../../utils.ts';
import './Navbar.css';
import Home from '../../icons/home_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import Group from '../../icons/group_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import Payments from '../../icons/payments_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import Assignment from '../../icons/assignment_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';

interface Props {
    navbarHeight: string;
}

const linkStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    cursor: 'pointer',
};

const getActiveLinkStyles = (isActive: boolean): CSSProperties => {
    return isActive ? { textDecoration: 'underline' } : { textDecoration: 'none' };
};

export default function Navbar({ navbarHeight }: Props) {
    const isMobileView = isMobile();

    const navStyles: CSSProperties = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: '1rem',
        width: '100%',
        height: navbarHeight,
        padding: '1rem',
        position: 'fixed',
        left: '0',
        boxSizing: 'border-box',
        borderBottom: '1px solid var(--outline)',
        backgroundColor: 'var(--accent-background-color)',
        zIndex: '9999',
        top: isMobileView ? undefined : '0',
        bottom: isMobileView ? '0' : undefined,
    };

    const navigate = useNavigate();

    const getNavItem = useCallback((path: string, title: string, icon: ReactNode) => {
        return (
            <div
                style={linkStyles}
                onClick={() => void navigate(path)}
            >
                {icon}
                {!isMobileView &&
                    <NavLink to={path} style={({ isActive }) => getActiveLinkStyles(isActive)}>{title}</NavLink>}
            </div>
        );
    }, [isMobileView, navigate]);

    return (
        <nav style={navStyles}>
            {getNavItem('/', 'Главная', <Home />)}
            {getNavItem('/group', 'Группа', <Group />)}
            {getNavItem('/expenses', 'Расходы', <Payments />)}
            {getNavItem('/list/user', 'Лист', <Assignment />)}
        </nav>
    );
}
