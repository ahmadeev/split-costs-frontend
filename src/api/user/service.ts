import type { User } from './dto.ts';
import { axiosClient } from '../axiosClient.ts';
import type { ListService } from '../../types/types.ts';
import { registerApi } from '../apiRegistry.ts';

class UserService implements ListService<User> {
    async getAll(): Promise<User[]> {
        const res = await axiosClient.get('/users');

        return res.data as User[];
    }
}

export const userService = new UserService();

registerApi('user', userService);
