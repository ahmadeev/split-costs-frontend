import type { AxiosResponse } from 'axios';

const publicApi = new Set<string>();
const registry = new Map<string, () => Promise<AxiosResponse<unknown[]>>>();

export function isPublicApi(entity: string) {
    return publicApi.has(entity);
}

export function getApi(entity: string) {
    const api = registry.get(entity);

    if (!api) {
        throw new Error(`API not registered: ${entity}`);
    }

    return api;
}

export function registerApi(entity: string, fn: () => Promise<AxiosResponse<unknown[]>>) {
    registry.set(entity, fn);
    publicApi.add(entity);
}
