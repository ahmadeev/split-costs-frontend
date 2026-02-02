import ListLayout from '../../components/ListLayout/ListLayout.tsx';

interface User {
    id: number,
    name: string,
    username: string,
}

export default function List() {
    return (
        <>
            <ListLayout<User>
                title={'Табличка'}
                fetchData={(): Promise<User[]> => ( fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json()) ) }
            />
        </>
    );
}
