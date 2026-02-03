import { NavLink } from 'react-router-dom';
import type { CSSProperties } from 'react';

interface Props {
    navbarHeight: string;
}

export default function Navbar({ navbarHeight }: Props) {
    const navStyles: CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        width: '100%',
        height: navbarHeight,
        padding: '1rem',
        position: 'fixed',
        top: '0',
        left: '0',
        boxSizing: 'border-box',
        borderBottom: '1px solid var(--outline)',
        backgroundColor: 'var(--accent-background-color)',
        zIndex: '9999',
    };

    const getActiveLinkStyles = (isActive: boolean): CSSProperties => {
        return isActive ? { textDecoration: 'underline' } : { textDecoration: 'none' };
    };

    return (
        <nav style={navStyles}>
            <NavLink to="/" style={({ isActive }) => getActiveLinkStyles(isActive)}>Главная</NavLink>
            <NavLink to="/group" style={({ isActive }) => getActiveLinkStyles(isActive)}>Группа</NavLink>
            <NavLink to="/expenses" style={({ isActive }) => getActiveLinkStyles(isActive)}>Расходы</NavLink>
            <NavLink to="/list/user" style={({ isActive }) => getActiveLinkStyles(isActive)}>Лист</NavLink>
        </nav>
    );
}
