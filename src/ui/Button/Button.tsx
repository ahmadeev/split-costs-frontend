import styles from './Button.module.css';
import type { ReactNode } from 'react';

interface Props {
    onClick: () => void;
    title: string | ReactNode;
    type: 'primary' | 'secondary' | 'link';
    isDisabled?: boolean;
}

export default function Button({ title, onClick, type, isDisabled }: Props) {
    return (
        <>
            <button
                className={`${styles[type]} ${isDisabled ? styles.disabled : ''}`}
                disabled={isDisabled}
                onClick={onClick}
            >{title}</button>
        </>
    );
}
