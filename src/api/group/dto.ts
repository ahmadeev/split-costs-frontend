import type { CreateMemberDto, Member } from '../member/dto.ts';

export interface Group {
    id: number,
    name: string,
    members: Member[],
}

export type CreateGroupDto = Omit<Group, 'id'> & { members: CreateMemberDto[] };
export type GroupResponseDTO = Group;
