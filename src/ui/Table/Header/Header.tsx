import { Button } from '../../Button/Button.tsx';
import { queryClient } from '../../../api/queryClient.ts';
import Refresh from '../../../icons/refresh_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24 (1).svg?react';
import { useIsFetching } from '@tanstack/react-query';
import { isMobile } from '../../../utils.ts';
import Filter from '../../../icons/filter_alt_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';

export default function Header({ cacheKey }: { cacheKey: string[] }) {
    const isMobileView = isMobile();

    const handleClick = () => {
        return;
    };

    useIsFetching({ queryKey: cacheKey });

    const queryState = queryClient.getQueryState(cacheKey);

    const lastFetched = queryState?.dataUpdatedAt ? new Date(queryState.dataUpdatedAt).toLocaleString() : 'никогда';

    return (
        <>
            <Button
                onClick={() => {
                    void queryClient.invalidateQueries({ queryKey: cacheKey });
                }}
                children={<Refresh />}
                variant={'secondary'}
            />
            <span style={{ marginRight: 'auto', color: 'var(--secondary-color)' }}>{!isMobileView && 'Последнее обновление: '}{lastFetched}</span>
            <Button
                children={(
                    <>
                        <Filter />
                        <span>Фильтры</span>
                    </>
                )}
                variant={'secondary'}
                onClick={handleClick}
                disabled={true}
            />
        </>
    );
}
