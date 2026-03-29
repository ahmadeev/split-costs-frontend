export abstract class AbstractFakeServer<T, R> {
    protected items: R[] = [];
    protected id = 1;

    constructor(items: R[], id: number) {
        this.items = items;
        this.id = id;
    }

    protected abstract mapToEntity(item: T, id: number): R;

    add(item: T): R {
        const result = this.mapToEntity(item, this.id++);

        this.items.push(result);

        return result;
    }

    findAll(): R[] {
        return this.items;
    }
}