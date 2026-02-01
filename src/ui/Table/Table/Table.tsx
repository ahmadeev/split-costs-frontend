import './Table.css';
import { useMemo } from 'react';

interface Column { databaseValue: string, displayValue: string}

interface Props {
    data: unknown[],
    visibleColumns?: Column[],
}

export default function Table({ data, visibleColumns }: Props) {
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
                        data.map((row: unknown, rowIndex: number)=> {
                            return (
                                // @ts-expect-error data type is unknown
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                <tr key={row.id ?? rowIndex}>
                                    {
                                        columns.map((column: Column)=> {
                                            return (
                                                <td key={column.databaseValue}>{
                                                    typeof row[column.databaseValue] === 'object' ? (
                                                        row[column.databaseValue].id ?? `(reference to ${column.databaseValue})`
                                                    ) : (
                                                        row[column.databaseValue]
                                                    )
                                                }</td>
                                            );
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
