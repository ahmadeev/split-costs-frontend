import { http, HttpResponse } from 'msw';
import type { GroupResponseDTO } from '../api/group/dto.ts';
import type { ExpenseMember } from '../api/expenseMember/dto.ts';
import { groupsFakeServer } from './GroupsFakeServer.ts';
import { expenseMembersFakeServer } from './ExpensesFakeServer.ts';

const USERS = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Anna' },
];

export const handlers = [
    http.get<{ id: string }>('/api/users/:id', ({ params }) => {
        const { id } = params;

        return HttpResponse.json(USERS.find(el => el.id === Number(id)));
    }),
    http.get('/api/users', () => {
        return HttpResponse.json(USERS);
    }),
    /* group */
    http.get('/api/groups', () => {
        return HttpResponse.json(groupsFakeServer.findAll());
    }),
    http.post('/api/groups', async ({ request }) => {
        const json = await request.json() as GroupResponseDTO;

        const response = groupsFakeServer.add(json);

        return HttpResponse.json(response);
    }),
    /* expense */
    http.get('/api/expenses', () => {
        return HttpResponse.json(expenseMembersFakeServer.findAllExpenses());
    }),
    /* expenseMember */
    http.post('/api/expense-member', async ({ request }) => {
        const json = await request.json() as ExpenseMember;

        const response = expenseMembersFakeServer.add(json);

        return HttpResponse.json(response);
    }),
];
