export function filterListHackatons(list, pattern) {
    try{
        return list.filter(el =>
            el.hackathon_name.toLowerCase().includes(pattern.toLowerCase()) ||
            el.host_hackathon.toLowerCase().includes(pattern.toLowerCase()) 
        );
    }catch{
        return list;
    }
}
export function filterListByWord(list, pattern) {
    try{
        return list.filter(el =>
            el.word.toLowerCase().includes(pattern.toLowerCase())
        );
    }catch{
        return list;
    }   
}
export function filterListByName(list, pattern) {
    try{
        return list.filter(el =>
            el.name.toLowerCase().includes(pattern.toLowerCase())
        );
    }catch{
        return list;
    }   
}
export function filterListByTag(list, pattern) {
    try{
        return list.filter(el =>
            el.name.toLowerCase().includes(pattern.toLowerCase())
        );
    }catch{
        return list;
    }   
}
export function filterListOfString(list, pattern) {
    return list.filter(el =>
        el.toLowerCase().includes(pattern.toLowerCase())
    );
}
