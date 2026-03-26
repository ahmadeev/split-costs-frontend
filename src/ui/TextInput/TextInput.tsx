import { type InputHTMLAttributes, useRef } from 'react';
import styles from './TextInput.module.css';

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label: string;
    value: string;
    isMandatory?: boolean;
}

export default function TextInput({ label, value, isMandatory, className = '', ...props }: TextInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleEditClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div className={styles.container}>
            <span className={styles.title}>{label}{isMandatory && <span className={styles.mandatory}> *</span>}</span>
            <div
                className={`form-layout__row form-layout__row_bordered form-layout__row_header-input ${className}`}
                onClick={handleEditClick}
            >
                <input
                    ref={inputRef}
                    type="text"
                    className={`${styles.input} ${styles.header}`}
                    value={value}
                    {...props}
                />
            </div>
        </div>
    );
}