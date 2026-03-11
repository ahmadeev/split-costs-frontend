import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('/api/expenses', () => {
        return HttpResponse.json([
            { id: 1, name: 'John' },
            { id: 2, name: 'Anna' },
        ]);
    }),
];
