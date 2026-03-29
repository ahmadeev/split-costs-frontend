import './Table.css';
import { useMemo } from 'react';

interface Props {
    data: Record<string, unknown>[],
    visibleColumns?: Column[],
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

export default function Table({ data, visibleColumns }: Props) {
    const columns: Column[] = useMemo(() => {
        if (visibleColumns) {
            return visibleColumns;
        }

        if (!data.length) {
            return [];
        }

        const firstRow = data[0];
        const keys = Object.keys(firstRow);

        return keys.map((key): Column => (
            { databaseValue: key, displayValue: key }
        ));
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
