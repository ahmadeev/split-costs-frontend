import ListLayout from '../../components/ListLayout/ListLayout.tsx';
import { useParams } from 'react-router-dom';
import { getApi, isPublicApi } from '../../api/apiRegistry.ts';

export default function List() {
    const { entity } = useParams();

    if (!entity || !isPublicApi(entity)) {
        throw new Error(`Invalid URL: ${String(entity)}`);
    }

    return (
        <>
            <ListLayout
                title={'Табличка'}
                fetchData={getApi(entity)}
            />
        </>
    );
}
