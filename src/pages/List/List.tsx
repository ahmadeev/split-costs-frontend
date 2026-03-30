import ListLayout from '../../components/ListLayout/ListLayout.tsx';
import { useParams } from 'react-router-dom';
import { getListApi, isPublicListApi } from '../../api/apiRegistry.ts';

export default function List() {
    const { entity } = useParams();

    if (!entity || !isPublicListApi(entity)) {
        throw new Error(`Invalid URL: ${String(entity)}`);
    }

    return (
        <>
            <ListLayout
                title={entity}
                entity={entity}
                cacheKey={[entity]}
                fetchData={getListApi(entity).getAll}
            />
        </>
    );
}
