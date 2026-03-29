import styles from './SegmentedControl.module.css';
import type { Option } from '../../types/types.ts';

interface Props {
    options: Option[];
    value: Option;
    onChange: (option: Option) => void;
}

export default function SegmentedControl({ options, value, onChange }: Props) {
    return (
        <div
            className={styles.container}
        >
            {options.map((option, index) => {
                const isActive = option.name === value.name;

                return (
                    <button
                        className={`${styles.button} ${isActive ? styles.active : ''}`}
                        key={index}
                        style={{ flexGrow: 1 }}
                        onClick={() => {
                            if (isActive) {
                                return;
                            }

                            onChange(option);
                        }}
                    >{option.name}</button>
                );
            })}
        </div>
    );
}
