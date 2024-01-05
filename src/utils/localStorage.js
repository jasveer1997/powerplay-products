import { set, get, remove } from 'local-storage';

// export const useLocalStorage = () => {
//     const onSetKey = (key, value) => {
//         set(key, value);
//     }, [set]);
//
//     const getKey = useCallback((key) => {
//         return get(key);
//     }, [get]);
//
//     const onDeleteKey = useCallback((key) => {
//         remove(key);
//     }, [remove]);
//
//     return { onSetKey, getKey, onDeleteKey };
// };

export { set, get, remove };

// Todo: Implement on to listen for cross browser support.