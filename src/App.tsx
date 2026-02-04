import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.tsx';
import './App.css';
import { isMobile } from './utils.ts';
import type { CSSProperties } from 'react';

const NAVBAR_HEIGHT = '10vh';

const getContainerStyle = (): CSSProperties => {
    const isMobileView = isMobile();

    return {
        height: `calc(100% - ${NAVBAR_HEIGHT})`,
        marginTop: isMobileView ? undefined : NAVBAR_HEIGHT,
        marginBottom: isMobileView ? NAVBAR_HEIGHT : undefined,
    };
};

export default function App() {
    const containerStyle = getContainerStyle();

    return (
        <>
            <Navbar
                navbarHeight={NAVBAR_HEIGHT}
            />
            <div
                className={'app__container'}
                style={containerStyle}
            >
                <Outlet/>
            </div>
        </>
    );
}
