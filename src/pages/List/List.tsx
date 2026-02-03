import ListLayout from '../../components/ListLayout/ListLayout.tsx';
import { useParams } from 'react-router-dom';
import apiFetch from '../../api/apiFetch.ts';
import PUBLIC_API from '../../api/publicUrls.ts';
import type { User } from '../../api/dtos.ts';

export default function List() {
    const { entity } = useParams();

    if (!(entity && entity in PUBLIC_API)) {
        throw new Error(`Invalid URL: ${String(entity)}`);
    }

    return (
        <>
            <ListLayout<User>
                title={'Табличка'}
                fetchData={(): Promise<User[]> => ( apiFetch<User[]>(PUBLIC_API[entity]) ) }
            />
        </>
    );
}
