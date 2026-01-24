import { Link, Outlet } from 'react-router-dom';

export default function App() {
    return (
        <div style={{ fontFamily: 'Arial', padding: '20px' }}>
            <div style={{ position: 'absolute', top: '1rem' }}>
                <nav style={{ display: 'flex', gap: '15px' }}>
                    <Link to="/">Главная</Link>
                    <Link to="/group">Группа</Link>
                    <Link to="/expenses">Расходы</Link>
                </nav>

                <hr/>
            </div>

            <Outlet/>
        </div>
    );
}
