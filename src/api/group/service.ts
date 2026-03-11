import { axiosClient } from '../axiosClient.ts';
import type { CreateGroupDto, GroupResponseDTO } from './dto.ts';
import type { ListService } from '../../types/types.ts';
import { registerApi } from '../apiRegistry.ts';
import { queryClient } from '../queryClient.ts';

class GroupService implements ListService<GroupResponseDTO> {
    async getAll(): Promise<GroupResponseDTO[]> {
        try {
            const res = await axiosClient.get<GroupResponseDTO[]>('/groups');

            return res.data;
        } catch (error) {
            console.log(error);

            return [];
        }
    }

    async create(group: CreateGroupDto): Promise<GroupResponseDTO> {
        const res = await axiosClient.post<GroupResponseDTO>('/groups', group);

        void queryClient.invalidateQueries({ queryKey: ['groups'] });


        return res.data;
    }
}

export const groupService = new GroupService();

registerApi('group', groupService);
