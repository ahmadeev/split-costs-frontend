import { type ChangeEvent, type SyntheticEvent } from 'react';
import styles from './TextInput.module.css';

interface Props {
    title: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    value: string,
    placeholder: string,
}

const handleEditClick = (e: SyntheticEvent<HTMLElement>): void => {
    const el = e.currentTarget.querySelector('input[type="text"]') as HTMLInputElement;

    el.focus();
};

export default function TextInput({ title, onChange, value, placeholder }: Props) {
    return (
        <>
            <span className={styles.title}>{title}</span>
            <div
                className={'form-layout__row form-layout__row_bordered form-layout__row_header-input'}
                onClick={handleEditClick}
            >
                <input
                    type="text"
                    className={`${styles.input} ${styles.header}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </>
    );
}