import './Table.css';
import { useMemo } from 'react';

interface Column { databaseValue: string, displayValue: string}

interface Props<T> {
    data: T[],
    visibleColumns?: Column[],
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
    const columns = useMemo(() => {
        return visibleColumns ?? Object.keys(data[0] ?? {}).map((key: string): Column => (
            { databaseValue: key, displayValue: key }
        ));
    }, [data, visibleColumns]);

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
                        data.map((row: T, rowIndex: number)=> {
                            return (
                                // @ts-expect-error data type is unknown
                                <tr key={(row as Record<string, unknown>).id ?? rowIndex}>
                                    {
                                        columns.map((column: Column)=> {
                                            const record = row as Record<string, unknown>;
                                            const key = column.databaseValue;
                                            const value = record[key];

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
