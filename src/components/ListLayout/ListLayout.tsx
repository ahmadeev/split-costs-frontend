import './ListLayout.css';
import Table from '../../ui/Table/Table/Table.tsx';
import Pagination from '../../ui/Table/Pagination/Pagination.tsx';
import Filters from '../../ui/Table/Filters/Filters.tsx';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface Props {
    title: string,
    fetchData: () => Promise<unknown[]>,
    cacheKey: string[],
}

export default function ListLayout({ title, fetchData, cacheKey }: Props) {
    const [currentPage, setCurrentPage] = useState(1);
    // todo: щас сеттера нет
    const [pageCount] = useState(10);

    const { data, isLoading, error } = useQuery({
        queryKey: cacheKey,
        queryFn: fetchData,
    });

    const renderTableSection = () => {
        if (isLoading) {
            return (
                <span>Loading...</span>
            );
        }

        if (error) {
            return (
                <span>Error</span>
            );
        }

        return (
            <Table
                data={data as Record<string, unknown>[]}
                // visibleColumns={COLUMNS}
            />
        );
    };

    return (
        <div
            className={'list-layout__container'}
        >
            <div
                className={'list-layout__title-container'}
            >
                <h1>{title}</h1>
            </div>

            <div
                className={'list-layout__filter-container'}
            >
                <Filters cacheKey={cacheKey} />
            </div>

            <div
                className={'list-layout__table-container'}
            >
                { renderTableSection() }
            </div>

            <div
                className={'list-layout__pagination-container'}
            >
                <Pagination
                    currentPage={currentPage}
                    pageCount={pageCount}
                    delta={1}
                    onChange={(page: number) => { setCurrentPage(page); }}
                />
            </div>
        </div>
    );
}
