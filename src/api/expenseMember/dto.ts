import type { Member } from '../member/dto.ts';
import type { CreateExpenseDto, Expense } from '../expense/dto.ts';

export interface ExpenseMemberDTO {
    id: number,
    expense: Expense,
    members: Member[],
}

export type CreateExpenseMemberDto = Omit<ExpenseMemberDTO, 'id' | 'expense' | 'members'> & { expense: CreateExpenseDto, members: Member[] };
export type ExpenseMemberResponseDto = ExpenseMemberDTO;
