import { axiosClient } from '../axiosClient.ts';
import type { CreateExpenseDto, ExpenseResponseDto } from './dto.ts';
import type { ListService } from '../../types/types.ts';
import { registerApi } from '../apiRegistry.ts';
import { queryClient } from '../queryClient.ts';

class ExpenseService implements ListService<ExpenseResponseDto> {
    async getAll(): Promise<ExpenseResponseDto[]> {
        try {
            const res = await axiosClient.get<ExpenseResponseDto[]>('/expenses');

            return res.data;
        } catch (error) {
            console.log(error);

            return [];
        }
    }

    async create(expense: CreateExpenseDto): Promise<ExpenseResponseDto> {
        const res = await axiosClient.post<ExpenseResponseDto>('/expenses', expense);

        void queryClient.invalidateQueries({ queryKey: ['expenses'] });

        return res.data;
    }
}

export const expenseService = new ExpenseService();

registerApi('expenses', expenseService);
