import './ListLayout.css';
import Table from '../../ui/Table/Table/Table.tsx';
import Pagination from '../../ui/Table/Pagination/Pagination.tsx';
import Filters from '../../ui/Table/Filters/Filters.tsx';
import { useEffect, useState } from 'react';

interface Props<T> {
    title: string,
    fetchData: () => Promise<T[]>;
}

export default function ListLayout<T extends object>({ title, fetchData }: Props<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    // todo: щас сеттера нет
    const [pageCount] = useState(10);

    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData()
            .then(setData)
            .catch(console.error)
            .finally(() => { setIsLoading(false); });
    }, [fetchData]);

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
                <Filters />
            </div>

            <div
                className={'list-layout__table-container'}
            >
                {
                    isLoading ? (
                        <span>Loading...</span>
                    ) : (
                        <Table<T>
                            data={data}
                            // visibleColumns={COLUMNS}
                        />
                    )
                }
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
