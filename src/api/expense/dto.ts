export interface Expense {
    id: number,
    total: number,
    details: string,
}

export type CreateExpenseDto = Omit<Expense, 'id'>;
export type ExpenseResponseDto = Expense;
