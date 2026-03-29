import './FormLayout.css';
import type { ReactNode } from 'react';

export default function FormLayout({ children }: { children: ReactNode }) {
    return (
        <form
            onSubmit={(e) => { e.preventDefault(); }}
            className='form-layout__container'
        >
            {children}
        </form>
    );
}
