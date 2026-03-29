import type { CreateGroupDto, Group } from '../api/group/dto.ts';
import { AbstractFakeServer } from './AbstractFakeServer.ts';

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

class GroupsFakeServer extends AbstractFakeServer<CreateGroupDto, Group> {
    protected mapToEntity(item: CreateGroupDto, id: number): Group {
        return {
            ...item,
            id,
        } as Group;
    }
}

export const groupsFakeServer = new GroupsFakeServer(groups, groups.length + 1);
