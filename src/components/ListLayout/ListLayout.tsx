import './ListLayout.css';
import Table from '../../ui/Table/Table/Table.tsx';
import Pagination from '../../ui/Table/Pagination/Pagination.tsx';
import Filters from '../../ui/Table/Filters/Filters.tsx';
import { useState } from 'react';

const DATA = [
    {
        id: 1,
        name: 'lol',
    },
    {
        id: 14,
        name: 'kek',
    },
    {
        id: 15,
        name: 'cheburek',
    },
    {
        id: 20,
        name: 'lol',
    },
];

const COLUMNS = [
    {
        displayValue: 'ID',
        databaseValue: 'id',
    },
    {
        displayValue: 'Имя',
        databaseValue: 'name',
    },
];

const TITLE = 'Табличка';

export default function ListLayout() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(10);

    return (
        <div
            className={'list-layout__container'}
        >
            <div
                className={'list-layout__title-container'}
            >
                <h1>{TITLE}</h1>
            </div>

            <div
                className={'list-layout__filter-container'}
            >
                <Filters />
            </div>

            <div
                className={'list-layout__table-container'}
            >
                <Table
                    data={DATA}
                    columns={COLUMNS}
                />
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
