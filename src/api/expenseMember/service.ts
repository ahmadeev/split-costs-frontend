import { axiosClient } from '../axiosClient.ts';
import type { CreateExpenseMemberDto, ExpenseMemberResponseDto } from './dto.ts';
import { queryClient } from '../queryClient.ts';

class ExpenseMemberService {
    async create(expenseMember: CreateExpenseMemberDto): Promise<ExpenseMemberResponseDto> {
        const res = await axiosClient.post<ExpenseMemberResponseDto>('/expense-member', expenseMember);

        void queryClient.invalidateQueries({ queryKey: ['expenseMember'] });

        return res.data;
    }
}

export const expenseMemberService = new ExpenseMemberService();
