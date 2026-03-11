import { useContext } from 'react';
import { GroupContext } from './context.ts';

export const useGroupContext = () => {
    const context = useContext(GroupContext);

    if (!context) {
        throw new Error('useGroupContext must be used within GroupProvider');
    }

    return context;
};
