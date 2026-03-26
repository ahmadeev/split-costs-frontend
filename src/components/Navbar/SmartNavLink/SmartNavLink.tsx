import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
    to: string;
    title: string;
    icon: (active: boolean) => ReactNode;
    isMobileView: boolean;
}

export default function SmartNavLink({ to, title, icon, isMobileView }: Props) {
    return (
        <NavLink
            to={to}
            className={'navbar__nav-item'}
        >
            {({ isActive }) => (
                <>
                    {icon(isActive)}
                    {!isMobileView && (
                        <span style={{ textDecoration: isActive ? 'underline' : 'none' }}>
                            {title}
                        </span>
                    )}
                </>
            )}
        </NavLink>
    );
}
