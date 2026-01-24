import { Link, Outlet } from 'react-router-dom';

type Styles = Record<string, string>;

export default function App() {
    const navStyles: Styles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        width: '100%',
        position: 'fixed',
        padding: '1rem',
        top: '0',
        left: '0',
        boxSizing: 'border-box',
        borderBottom: '1px solid #ddd',
        backgroundColor: 'white',
        zIndex: '9999',
    };

    return (
        <>
            <nav style={navStyles}>
                <Link to="/">Главная</Link>
                <Link to="/group">Группа</Link>
                <Link to="/expenses">Расходы</Link>
            </nav>
            <div style={{ fontFamily: 'Arial', padding: '20px' }}>
                <Outlet/>
            </div>
        </>
    );
}
