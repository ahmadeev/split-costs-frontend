export function range(start: number, end: number) {
    return Array.from({ length: end - start + 1 }).map((_, i) => ( i + start ));
}

export function isMobile() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
