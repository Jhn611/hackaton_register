export function filterList(list, pattern) {
    return list.filter(el =>
        el.name.toLowerCase().includes(pattern.toLowerCase()) ||
        el.host.toLowerCase().includes(pattern.toLowerCase())
    );
}
export function filterListOfString(list, pattern) {
    return list.filter(el =>
        el.toLowerCase().includes(pattern.toLowerCase())
    );
}