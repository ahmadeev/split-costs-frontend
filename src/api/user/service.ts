import type { User } from './dto.ts';
import { axiosClient } from '../axiosClient.ts';
import type { ListService, RecordService } from '../../types/types.ts';
import { registerListApi, registerRecordApi } from '../apiRegistry.ts';

class UserService implements ListService<User>, RecordService<User> {
    async getById(id: number): Promise<User> {
        const res = await axiosClient.get(`/users/${String(id)}`);

        return res.data as User;
    }

    async getAll(): Promise<User[]> {
        const res = await axiosClient.get('/users');

        return res.data as User[];
    }
}

export const userService = new UserService();

registerListApi('users', userService);
registerRecordApi('users', userService);
