import Button from '../../Button/Button.tsx';
import { queryClient } from '../../../api/queryClient.ts';

export default function Filters({ cacheKey }: { cacheKey: string[] }) {
    const handleClick = () => {
        return;
    };

    return (
        <>
            <Button
                onClick={() => {
                    void queryClient.invalidateQueries({ queryKey: cacheKey });
                }}
                title={'Refresh'}
                type={'secondary'}
            />
            <Button
                title={'Фильтры'}
                type={'secondary'}
                onClick={handleClick}
                isDisabled={true}
            />
        </>
    );
}
