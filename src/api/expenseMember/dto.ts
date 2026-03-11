import type { Expense } from '../../types/types.ts';
import type { Member } from '../member/dto.ts';

export interface ExpenseMemberDTO {
    id: number,
    expense: Expense,
    members: Member[],
}

export type CreateExpenseMemberDto = Omit<ExpenseMemberDTO, 'id'>;
export type ExpenseMemberResponseDto = ExpenseMemberDTO;
