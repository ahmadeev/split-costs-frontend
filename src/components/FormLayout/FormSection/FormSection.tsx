import type { ReactNode } from 'react';
import styles from './FormSection.module.css';

export default function FormSection({ children }: {children: ReactNode}) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
}