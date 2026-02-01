import './Table.css';

interface Column { databaseValue: string, displayValue: string}

interface Props {
    data: unknown[],
    columns: Column[],
}

export default function Table({ data, columns }: Props) {
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
