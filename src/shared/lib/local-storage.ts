export const getStorageItem = (key: string): string | null => {
    return localStorage.getItem(key)
}
