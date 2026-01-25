import Table from '../../ui/Table/Table.tsx';

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
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <h2>{TITLE}</h2>

            <Table
                data={DATA}
                columns={COLUMNS}
            />
        </div>
    );
}
