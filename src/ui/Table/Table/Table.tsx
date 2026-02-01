import './Table.css';

interface Column { databaseValue: string, displayValue: string}

interface Props {
    data: unknown[],
    visibleColumns?: Column[],
}

export default function Table({ data, visibleColumns }: Props) {
    const columns = visibleColumns ?? Object.keys(data[0] ?? {}).map((key: string) => (
        { databaseValue: key, displayValue: key }
    ));

    return (
        <>
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
                                                // @ts-expect-error data type is unknown
                                                <td key={column.databaseValue}>{row[column.databaseValue]}</td>
                                            );
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </>
    );
}
