import { http, HttpResponse } from 'msw';
import type { Group, GroupResponseDTO } from '../api/group/dto.ts';

let id = 3;

const GROUP: Group = {
    id: 1,
    name: 'Дружная компания',
    members: [
        {
            id: 1,
            name: 'Леша',
        },
        {
            id: 2,
            name: 'Саша',
        },
        {
            id: 3,
            name: 'Ваня',
        },
        {
            id: 4,
            name: 'Дима',
        },
        {
            id: 5,
            name: 'Тима',
        },
        {
            id: 6,
            name: 'Фая',
        },
    ],
};

const GROUP_2: Group = {
    id: 2,
    name: 'веселые посиделки',
    members: [
        {
            id: 1,
            name: 'Леша',
        },
    ],
};

const groups: Group[] = [GROUP, GROUP_2];

export const handlers = [
    http.get('/api/users', () => {
        return HttpResponse.json([
            { id: 1, name: 'John' },
            { id: 2, name: 'Anna' },
        ]);
    }),
    /* group */
    http.get('/api/groups', () => {
        return HttpResponse.json(groups);
    }),
    http.post('/api/groups', async ({ request }) => {
        const json = await request.json() as GroupResponseDTO;

        json.id = id++;

        groups.push(json);

        return HttpResponse.json(json);
    }),
];
