export const getStorageItem = (key: string): string | null => {
    try {
        return localStorage.getItem(key)
    } catch {
        return null
    }
}

export const setStorageItem = (key: string, value: string): void => {
    try {
        localStorage.setItem(key, value)
    } catch {
        // ignore quota errors in demo app
    }
}

export const removeStorageItem = (key: string): void => {
    try {
        localStorage.removeItem(key)
    } catch {
        // ignore
    }
}

export const getStorageJson = <T>(key: string): T | null => {
    const raw = getStorageItem(key)

    if (!raw) {
        return null
    }

    try {
        return JSON.parse(raw) as T
    } catch {
        return null
    }
}

export const setStorageJson = <T>(key: string, value: T): void => {
    setStorageItem(key, JSON.stringify(value))
}
