import styles from './SegmentedControl.module.css';
import { useState } from 'react';

interface Option { name: string, handler: (() => void) | null | undefined }

interface Props {
    options: Option[],
    defaultOption: Option,
}

export default function SegmentedControl({ options, defaultOption }: Props) {
    const [activeOption, setActiveOption] = useState<Option>(defaultOption);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            {options.map((option, index) => (
                <button
                    className={`${styles.button} ${option.name === activeOption.name ? styles.active : ''}`}
                    key={index}
                    style={{ flexGrow: 1 }}
                    onClick={() => {
                        if (option.name === activeOption.name) {
                            return;
                        }

                        setActiveOption(option);

                        if (option.handler) {
                            option.handler();
                        }
                    }}
                >{option.name}</button>
            ))}
        </div>
    );
}
