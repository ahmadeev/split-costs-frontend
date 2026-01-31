import styles from './Button.module.css';

interface Props {
    onClick: () => void;
    title: string;
    type: 'primary' | 'secondary' | 'link';
    isDisabled?: boolean;
}

export default function Button({ title, onClick, type, isDisabled }: Props) {
    return (
        <>
            <button
                className={`${styles[type]} ${isDisabled ? styles.disabled : ''}`}
                disabled={isDisabled}
                onClick={onClick}
            >{title}</button>
        </>
    );
}
