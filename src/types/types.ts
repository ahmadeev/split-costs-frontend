export interface Member { name: string }
export interface MemberResponseDTO extends Member { id: number }
export type MemberRequestDTO = Member;

export interface Group { name: string, members: Member[] }
export interface GroupResponseDTO extends Group { id: number, members: MemberResponseDTO[] }
export type GroupRequestDTO = Group;

export interface Expense { total: number, details: string, group: Group }
export interface ExpenseResponseDTO extends Expense { id: number, group: GroupResponseDTO }
export type ExpenseRequestDTO = Expense;
