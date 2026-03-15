import { useEffect, useState } from 'react';
import styles from './SelectInput.module.css';
import type { Option } from '../../types/types.ts';

interface Props {
    options: Option[],
    displayValue: string | null | undefined,
    onChange: (id: number) => void,
    placeholder?: string,
}

export default function SelectInput({ displayValue, options, onChange, placeholder }: Props) {
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        const callback = (e: PointerEvent) => {
            const select = document.querySelector(`.${styles.container}`);

            if (!select?.contains(e.target as Node)) {
                setIsShown(false);
            }
        };

        document.addEventListener('click', callback);

        return () => {
            document.removeEventListener('click', callback);
        };
    }, []);

    return (
        <div className={styles.container}>
            <div
                className={`${styles.option} ${styles.option_header} ${isShown ? styles.option_top : ''} ${displayValue ? '' : styles.trigger}`}
                onClick={() => {
                    setIsShown(!isShown);
                }}
            >
                <span>{displayValue ?? placeholder ?? 'Выберите из списка'}</span>
                <span>&#9660;</span>
            </div>
            {
                isShown && (
                    <div className={styles.block}>
                        {
                            options.map((option: Option) => (
                                <div
                                    className={styles.option}
                                    key={option.id}
                                    onClick={() => {
                                        onChange(option.id ?? 0);
                                        setIsShown(!isShown);
                                    }}
                                >
                                    <span>{option.name}</span>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}
