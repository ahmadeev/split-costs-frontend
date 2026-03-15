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
            {options.map((option, index) => (
                <button
                    className={`${styles.button} ${option.name === value.name ? styles.active : ''}`}
                    key={index}
                    style={{ flexGrow: 1 }}
                    onClick={() => {
                        if (option.name === value.name) {
                            return;
                        }

                        onChange(option);
                    }}
                >{option.name}</button>
            ))}
        </div>
    );
}
