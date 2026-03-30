import type { ListService, RecordService } from '../types/types.ts';

const listServiceRegistry = new Map<string, ListService<unknown>>();
const recordServiceRegistry = new Map<string, RecordService<unknown>>();
const publicApi = new Set<string>();

export function isPublicListApi(entity: string) {
    return listServiceRegistry.has(entity);
}

export function isPublicRecordApi(entity: string) {
    return recordServiceRegistry.has(entity);
}

export function getListApi<T>(entity: string) {
    const api = listServiceRegistry.get(entity);

    if (!api) {
        throw new Error(`API not registered: ${entity}`);
    }

    return api as ListService<T>;
}

export function getRecordApi<T>(entity: string) {
    const api = recordServiceRegistry.get(entity);

    if (!api) {
        throw new Error(`API not registered: ${entity}`);
    }

    return api as RecordService<T>;
}

export function registerListApi<T>(entity: string, service: ListService<T>) {
    listServiceRegistry.set(entity, service);
    publicApi.add(entity);
}

export function registerRecordApi<T>(entity: string, service: RecordService<T>) {
    recordServiceRegistry.set(entity, service);
    publicApi.add(entity);
}
