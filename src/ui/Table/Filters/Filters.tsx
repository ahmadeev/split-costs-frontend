import Button from '../../Button/Button.tsx';

export default function Filters() {
    const handleClick = () => {
        return;
    };

    return (
        <>
            <Button
                title={'Фильтры'}
                type={'secondary'}
                onClick={handleClick}
                isDisabled={true}
            />
        </>
    );
}
