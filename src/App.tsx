import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.tsx';

const NAVBAR_HEIGHT = '10vh';

const containerStyles = {
    marginTop: NAVBAR_HEIGHT,
    width: '100%',
    height: `calc(100% - ${NAVBAR_HEIGHT})`,
};

export default function App() {
    return (
        <>
            <Navbar
                navbarHeight={NAVBAR_HEIGHT}
            />
            <div style={containerStyles}>
                <Outlet/>
            </div>
        </>
    );
}
