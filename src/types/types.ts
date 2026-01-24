export interface Member { id: number, name: string }

export interface Group { id?: number, name: string, members: Member[] }

export interface Expense { id?: number, total: number, details: string, group: Group }
