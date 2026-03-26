import { type InputHTMLAttributes, type ReactNode } from 'react';
import styles from './TextInput.module.css';

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
    controlledValue: string;
    isMandatory?: boolean;
    wrapperClassName?: string;
    variant?: 'bordered' | 'borderless';
    rightSection?: ReactNode;
}

export default function TextInput({ label, variant = 'borderless', controlledValue, isMandatory = false, wrapperClassName = '', rightSection, ...props }: TextInputProps) {
    return (
        <div className={styles.container}>
            {
                label && (
                    <span className={styles.title}>{label}{isMandatory &&
                        <span className={styles.mandatory}> *</span>}</span>
                )
            }
            <div
                className={`${styles.wrapper} ${styles[variant]} ${wrapperClassName}`}
            >
                <input
                    type="text"
                    className={`${styles.input} ${styles.header}`}
                    value={controlledValue}
                    {...props}
                />
                {rightSection}
            </div>
        </div>
    );
}