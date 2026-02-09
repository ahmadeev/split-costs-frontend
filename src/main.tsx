import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './pages/Home/Home.tsx';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import GroupForm from './pages/Group/GroupForm.tsx';
import ExpensesForm from './pages/Expenses/ExpensesForm.tsx';
import NotFoundError from './pages/NotFoundError/NotFoundError.tsx';
import List from './pages/List/List.tsx';
import './api/index.ts';

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
                path: '/list/:entity',
                element: <List />,
            },
        ],
        errorElement: <NotFoundError />,
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
