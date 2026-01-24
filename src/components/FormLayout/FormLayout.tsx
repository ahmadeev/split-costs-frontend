import './FormLayout.css';
import type { ReactNode } from 'react';

export default function FormLayout({ children }: { children: ReactNode }) {
    return (
        <div className='form-layout__container'>
            {children}
        </div>
    );
}
