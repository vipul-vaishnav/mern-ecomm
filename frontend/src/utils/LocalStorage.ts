export const LOCAL_STORAGE_KEY = 'proshop_cart'
export class LocalStorage {
  // Get item from local storage
  static get(key: string = LOCAL_STORAGE_KEY) {
    if (typeof window === 'undefined') return
    const value = localStorage.getItem(key)
    if (value) {
      try {
        return JSON.parse(value)
      } catch (err) {
        return null
      }
    }
    return null
  }

  // Set a value in local storage by key
  static set<T>(key: string = LOCAL_STORAGE_KEY, value: T) {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, JSON.stringify(value))
  }

  // Remove a value from local storage by key
  static remove(key: string = LOCAL_STORAGE_KEY) {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  }

  // Clear local storage
  static clear() {
    if (typeof window === 'undefined') return
    else {
      localStorage.clear()
    }
  }
}
