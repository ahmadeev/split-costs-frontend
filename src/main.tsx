import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './pages/Home/Home.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import GroupForm from './components/GroupForm/GroupForm.tsx';
import ExpensesForm from './components/ExpensesForm/ExpensesForm.tsx';

const router = createBrowserRouter([
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
        ],
    },
]);


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
