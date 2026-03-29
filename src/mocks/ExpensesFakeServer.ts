import { AbstractFakeServer } from './AbstractFakeServer.ts';
import type { CreateExpenseMemberDto, ExpenseMember } from '../api/expenseMember/dto.ts';

class ExpenseMembersFakeServer extends AbstractFakeServer<CreateExpenseMemberDto, ExpenseMember> {
    protected mapToEntity(item: CreateExpenseMemberDto, id: number): ExpenseMember {
        return {
            ...item,
            id,
        } as ExpenseMember;
    }

    findAllExpenses() {
        return this.items.map(em => em.expense);
    }
}

export const expenseMembersFakeServer = new ExpenseMembersFakeServer([], 1);
