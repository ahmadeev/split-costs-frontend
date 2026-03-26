import { type InputHTMLAttributes, useRef } from 'react';
import styles from './TextInput.module.css';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement>/*Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>*/ {
    label: string;
    controlledValue: string;
    isMandatory?: boolean;
    wrapperClassName?: string;
}

export default function TextInput({ label, controlledValue, isMandatory = false, wrapperClassName = '', ...props }: TextInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleEditClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div className={styles.container}>
            <span className={styles.title}>{label}{isMandatory && <span className={styles.mandatory}> *</span>}</span>
            <div
                className={wrapperClassName}
                onClick={handleEditClick}
            >
                <input
                    ref={inputRef}
                    type="text"
                    className={`${styles.input} ${styles.header}`}
                    value={controlledValue}
                    {...props}
                />
            </div>
        </div>
    );
}