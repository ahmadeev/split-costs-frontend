/*
export interface Member { id: number, name: string }

export interface Group { id: number, name: string, members: Member[] }

export interface Expense { id: number, total: number, details: string }

export interface ExpenseMember { id: number, expense: Expense, members: Member[] }
*/

export interface Option { id?: number, name: string }

export interface ListService<T> { getAll: () => Promise<T[]> }

export interface RecordService<T> { getById: (id: number) => Promise<T> }
