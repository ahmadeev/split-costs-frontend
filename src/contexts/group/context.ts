import React, { createContext } from 'react';
import type { Group } from '../../api/group/dto.ts';

interface GroupContextType {
    groups: Group[]
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>
}

export const GroupContext = createContext<GroupContextType | undefined>(undefined);
