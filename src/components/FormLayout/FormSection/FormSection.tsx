import type { ReactNode } from 'react';
import './FormSection.css';

export default function FormSection({ children }: {children: ReactNode}) {
    return (
        <div className="form-section__container">
            {children}
        </div>
    );
}