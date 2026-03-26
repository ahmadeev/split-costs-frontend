import { cloneElement, type CSSProperties, type ReactElement, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
    path: string;
    currentPath: string;
    title: string;
    icon: ReactNode;
    onClick: () => void;
    isMobileView: boolean;
}

const getActiveLinkStyles = (isActive: boolean): CSSProperties => {
    return isActive ? { textDecoration: 'underline' } : { textDecoration: 'none' };
};

export default function SmartNavLink({ path, currentPath, title, icon, onClick, isMobileView }: Props) {
    const styledIcon = icon && cloneElement(icon as ReactElement<{ style?: CSSProperties}>, {
        style: {
            fill: currentPath === path ? 'var(--color)' : 'var(--secondary-color)',
        },
    });

    return (
        <div
            className={'navbar__nav-item'}
            onClick={onClick}
        >
            {styledIcon}
            {!isMobileView &&
                <NavLink to={path} style={({ isActive }) => getActiveLinkStyles(isActive)}>{title}</NavLink>}
        </div>
    );
}
