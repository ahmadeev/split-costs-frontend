import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './pages/Home/Home.tsx';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import GroupForm from './pages/Group/GroupForm.tsx';
import ExpensesForm from './pages/Expenses/ExpensesForm.tsx';
import FallbackPage from './pages/FallbackPage/FallbackPage.tsx';
import List from './pages/List/List.tsx';
import './api/index.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GlobalProvider } from './contexts/group/provider.tsx';
import ListMenu from './pages/ListMenu/ListMenu.tsx';

const router = createHashRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/group',
                element: <GroupForm />,
            },
            {
                path: '/expenses',
                element: <ExpensesForm />,
            },
            {
                path: '/lists',
                element: <ListMenu />,
            },
            {
                path: '/list/:entity',
                element: <List />,
            },
        ],
        errorElement: <FallbackPage />,
    },
]);

await enableMocking();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GlobalProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </GlobalProvider>
    </StrictMode>,
);

async function enableMocking() {
/*    if (import.meta.env.DEV) {
        const { worker } = await import('./mocks/browser.ts');

        await worker.start();
    }*/

    const { worker } = await import('./mocks/browser.ts');

    await worker.start({
        serviceWorker: {
            url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
        },
    });
}
