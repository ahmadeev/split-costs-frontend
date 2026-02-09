import type { AxiosResponse } from 'axios';
import type { User } from './dto.ts';
import { axiosClient } from '../axiosClient.ts';
import { registerApi } from '../apiRegistry.ts';

export const userApi = {
    getAllUsers(): Promise<AxiosResponse<User[]>> {
        return axiosClient.get('/users');
    },
};

// eslint-disable-next-line @typescript-eslint/unbound-method
registerApi('user', userApi.getAllUsers);
