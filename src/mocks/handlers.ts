import { http, HttpResponse } from 'msw';
import type { GroupResponseDTO } from '../api/group/dto.ts';

let id = 3;

export const handlers = [
    http.get('/api/meow', () => {
        return HttpResponse.json([
            { id: 1, name: 'John' },
            { id: 2, name: 'Anna' },
        ]);
    }),
    /* group */
    http.post('/api/group', async ({ request }) => {
        const json = await request.json() as GroupResponseDTO;

        json.id = id++;

        return HttpResponse.json(json);
    }),
];
