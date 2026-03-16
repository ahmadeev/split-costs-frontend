import type { ReactNode } from 'react';
import Close from '../../icons/close_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';

export default function CloseableInfo({ children }: { children?: ReactNode }) {
    return (
        <div
            style={{
                backgroundColor: 'var(--third-background-color)',
                padding: '1rem 2rem',
                width: 'fit-content',
                borderRadius: 'var(--border-radius)',
                position: 'relative',
            }}
        >
            <Close style={{ position: 'absolute', top: '1rem', right: '1rem', fill: 'var(--color)' }}></Close>
            {children}
        </div>
    );
}