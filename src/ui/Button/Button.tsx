import styles from './Button.module.css';

interface Props {
    onClick: () => void;
    title: string;
    type: 'primary' | 'secondary' | 'link';
}

export default function Button({ title, onClick, type }: Props) {
    return (
        <>
            <button
                className={styles[type]}
                onClick={onClick}
            >{title}</button>
        </>
    );
}
