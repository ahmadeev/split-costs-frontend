import { useEffect, useState } from 'react';
import styles from './SelectInput.module.css';
import type { Option } from '../../types/types.ts';

interface Props {
    options: Option[];
    defaultValue?: Option | null;
    handler: (id: number) => void;
}

export default function SelectInput({ options, handler, defaultValue }: Props) {
    const [isShown, setIsShown] = useState(false);

    const [value, setValue] = useState<Option | null | undefined>(defaultValue);

    useEffect(() => {
        document.addEventListener('click', (e: PointerEvent) => {
            const select = document.querySelector(`.${styles.container}`);

            if (!select?.contains(e.target as Node)) {
                setIsShown(false);
            }
        });
    }, []);

    return (
        <div className={styles.container}>
            <div
                className={`${styles.option} ${styles.option_header} ${isShown ? styles.option_top : ''} ${value ? '' : styles.trigger}`}
                onClick={() => {
                    setIsShown(!isShown);
                }}
            >
                <span>{value?.name ?? 'Выберите группу'}</span>
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
                                        setValue(option);
                                        handler(option.id ?? 0);
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
