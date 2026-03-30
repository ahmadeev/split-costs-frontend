import { useParams } from 'react-router-dom';
import { getRecordApi, isPublicListApi } from '../../api/apiRegistry.ts';
import { useQuery } from '@tanstack/react-query';

export default function RecordPage() {
    const { entity, id } = useParams();

    if (!entity || !id || !isPublicListApi(entity)) {
        throw new Error(`Invalid URL: ${String(entity)}`);
    }

    const api = getRecordApi(entity);

    const { data, isLoading, error } = useQuery({
        queryKey: [entity, id],
        queryFn: () => ( api.getById(Number(id)) ),
    });

    if (isLoading) {
        return <>Загрузка</>;
    }

    if (error) {
        throw error;
    }

    return (
        <>
            <h3>/{entity}/{id}</h3>
            <p>{JSON.stringify(data, null, 4)}</p>
        </>
    );
}
