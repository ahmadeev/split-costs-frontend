import { NavLink } from 'react-router-dom';
import { type CSSProperties } from 'react';
import { isMobile } from '../../utils.ts';
import './Navbar.css';
import Home from '../../icons/home_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import Group from '../../icons/group_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import Payments from '../../icons/payments_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';

interface Props {
    navbarHeight: string;
}

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

    const linkStyles: CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
    };

    return (
        <nav style={navStyles}>
            <div style={linkStyles}>
                <Home/>
                {!isMobileView && <NavLink to="/" style={({ isActive }) => getActiveLinkStyles(isActive)}>Главная</NavLink>}
            </div>
            <div style={linkStyles}>
                <Group/>
                {!isMobileView && <NavLink to="/group" style={({ isActive }) => getActiveLinkStyles(isActive)}>Группа</NavLink>}
            </div>
            <div style={linkStyles}>
                <Payments/>
                {!isMobileView && <NavLink to="/expenses" style={({ isActive }) => getActiveLinkStyles(isActive)}>Расходы</NavLink>}
            </div>
            <div style={linkStyles}>
                <NavLink to="/list/user" style={({ isActive }) => getActiveLinkStyles(isActive)}>Лист</NavLink>
            </div>
        </nav>
    );
}
