export interface Member { name: string }
export interface MemberResponseDTO extends Member { id: number }
export type MemberRequestDTO = Member;

export interface Group { name: string, members: Member[] }
export interface GroupResponseDTO extends Group { id: number, members: MemberResponseDTO[] }
export type GroupRequestDTO = Group;

export interface Expense { total: number, details: string }
export interface ExpenseResponseDTO extends Expense { id: number, members: MemberResponseDTO[] }
export type ExpenseRequestDTO = Expense;

export interface ExpenseMember { expense: Expense, members: Member[] }
export interface ExpenseMemberResponseDTO extends ExpenseMember { expense: Expense, members: MemberResponseDTO[] }
export type ExpenseMemberRequestDTO = ExpenseMember;
