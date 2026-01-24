import { NavLink, Outlet } from 'react-router-dom';
import type { CSSProperties } from 'react';

export default function App() {
    const navHeight = '10vh';

    const navStyles: CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        width: '100%',
        height: navHeight,
        padding: '1rem',
        position: 'fixed',
        top: '0',
        left: '0',
        boxSizing: 'border-box',
        borderBottom: '1px solid #ddd',
        backgroundColor: 'white',
        zIndex: '9999',
    };

    const getActiveLinkStyles = (isActive: boolean): CSSProperties => {
        return isActive ? { textDecoration: 'underline' } : { textDecoration: 'none' };
    };

    return (
        <>
            <nav style={navStyles}>
                <NavLink to="/" style={({ isActive }) => getActiveLinkStyles(isActive)}>Главная</NavLink>
                <NavLink to="/group" style={({ isActive }) => getActiveLinkStyles(isActive)}>Группа</NavLink>
                <NavLink to="/expenses" style={({ isActive }) => getActiveLinkStyles(isActive)}>Расходы</NavLink>
            </nav>
            <div style={{ marginTop: navHeight, width: '100%', height: '100%' }}>
                <Outlet/>
            </div>
        </>
    );
}
