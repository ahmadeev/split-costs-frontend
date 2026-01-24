export interface Member { id: number, name: string }

export interface Group { name: string, members: Member[] }

export interface Expense { total: number, details: string, group: Group }
