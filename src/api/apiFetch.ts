export default async function apiFetch<T>(path: string): Promise<T> {
    const res = await fetch(path);

    if (!res.ok) {
        throw new Error(`API error: ${String(res.status)}`);
    }

    const data: unknown = await res.json();

    return data as T;
}
