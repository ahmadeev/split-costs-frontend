import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.tsx';
import './App.css';

const NAVBAR_HEIGHT = '10vh';

const containerStyles = {
    marginTop: NAVBAR_HEIGHT,
    height: `calc(100% - ${NAVBAR_HEIGHT})`,
};

export default function App() {
    return (
        <>
            <Navbar
                navbarHeight={NAVBAR_HEIGHT}
            />
            <div
                className={'app__container'}
                style={containerStyles}
            >
                <Outlet/>
            </div>
        </>
    );
}
