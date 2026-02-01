import { type ChangeEvent, useRef } from 'react';
import styles from './TextInput.module.css';

interface Props {
    title: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    value: string,
    placeholder: string,
    onFocus?: () => void,
    onBlur?: () => void,
}

export default function TextInput({ title, onChange, value, placeholder, onFocus, onBlur }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleEditClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div className={styles.container}>
            <span className={styles.title}>{title}</span>
            <div
                className={'form-layout__row form-layout__row_bordered form-layout__row_header-input'}
                onClick={handleEditClick}
            >
                <input
                    ref={inputRef}
                    type="text"
                    className={`${styles.input} ${styles.header}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </div>
        </div>
    );
}