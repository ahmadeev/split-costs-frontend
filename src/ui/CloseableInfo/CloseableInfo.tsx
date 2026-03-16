import { type ReactNode } from 'react';
import Close from '../../icons/close_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import styles from './CloseableInfo.module.css';

interface Props {
    title: string;
    children?: ReactNode;
    isOpen: boolean;
    onStateChange: (isOpen: boolean) => void;
}

export default function CloseableInfo({ title, children, isOpen, onStateChange }: Props) {
    if (!isOpen) return null;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <Close
                    className={styles.icon}
                    onClick={() => { onStateChange(false); }}
                />
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}