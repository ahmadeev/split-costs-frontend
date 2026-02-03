import './Table.css';
import { useMemo } from 'react';

interface Props<T extends object> {
    data: T[],
    visibleColumns?: Column<T>[],
}

interface Column<T extends object> {
    databaseValue: keyof T,
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

export default function Table<T extends object>({ data, visibleColumns }: Props<T>) {
    const columns: Column<T>[] = useMemo(() => {
        if (visibleColumns) {
            return visibleColumns;
        }

        if (!data.length) {
            return [];
        }

        const firstRow = data[0];
        const keys = Object.keys(firstRow) as (keyof T)[];

        return keys.map((key): Column<T> => (
            { databaseValue: key, displayValue: String(key) }
        ));
    }, [data, visibleColumns]);

    return (
        <div className={'ui-table__container'}>
            <table>
                <thead>
                    <tr>
                        {
                            columns.map((column: Column<T>)=> {
                                return (
                                    <th key={String(column.databaseValue)}>{column.displayValue}</th>
                                );
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((row: T, rowIndex: number)=> {
                            return (
                                // @ts-expect-error data type is unknown
                                <tr key={(row as Record<string, unknown>).id ?? rowIndex}>
                                    {
                                        columns.map((column: Column<T>)=> {
                                            const key = column.databaseValue;
                                            const value = row[key];

                                            return <td key={String(key)}>{renderCell(value, String(key))}</td>;
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
