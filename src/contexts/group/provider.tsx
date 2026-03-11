import { type ReactNode, useState } from 'react';
import { GroupContext } from './context.ts';
import type { Group } from '../../api/group/dto.ts';

export const GroupProvider = ({ children }: { children: ReactNode }) => {
    const [groups, setGroups] = useState<Group[]>([]);

    return (
        <GroupContext.Provider value={{ groups, setGroups }}>
            {children}
        </GroupContext.Provider>
    );
};
