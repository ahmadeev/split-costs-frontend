import './Table.css';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    data: Record<string, unknown>[],
    visibleColumns?: Column[],
    entity: string,
}

interface Column {
    databaseValue: string,
    displayValue: string
}

function renderCell(value: unknown, key: string) {
    if (value == null) return '';

    if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
    ) {
        return value;
    }

    return `(reference to ${key})`;
}

function modifyColumnArray(arr: Column[]) {
    const index = arr.findIndex(value => value.databaseValue.startsWith('id'));

    if (index === -1) {
        return;
    }

    const title = arr.splice(index, 1)[0];

    arr.unshift(title);
}

export default function Table({ data, visibleColumns, entity }: Props) {
    const columns: Column[] = useMemo(() => {
        if (visibleColumns) {
            modifyColumnArray(visibleColumns);

            return visibleColumns;
        }

        if (!data.length) {
            return [];
        }

        const keys = Object.keys(data[0]);

        const columns = keys.map((key): Column => (
            { databaseValue: key, displayValue: key }
        ));

        modifyColumnArray(columns);

        return columns;
    }, [data, visibleColumns]);

    if (!data.length) {
        return (
            <div
                className={'ui-table__container'}
                style={{ textAlign: 'center' }}
            >
                <span>Данные отсутствуют</span>
            </div>
        );
    }

    return (
        <div className={'ui-table__container'}>
            <table>
                <thead>
                    <tr>
                        {
                            columns.map((column: Column)=> {
                                return (
                                    <th key={column.databaseValue}>{column.displayValue}</th>
                                );
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length && data.map((row: Record<string, unknown>, rowIndex: number)=> {
                            return (
                                // @ts-expect-error data type is unknown
                                <tr key={row.id ?? rowIndex}>
                                    {
                                        columns.map((column: Column)=> {
                                            const key = column.databaseValue;
                                            const value = row[key];

                                            if (key === 'id') {
                                                return <td key={key}><Link to={`/record/${entity}/${String(row.id)}`}>{renderCell(value, key)}</Link></td>;
                                            }

                                            return <td key={key}>{renderCell(value, key)}</td>;
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}
