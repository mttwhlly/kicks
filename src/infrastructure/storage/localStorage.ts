// src/infrastructure/storage/localStorage.ts
export class LocalStorageService {
    static setItem<T>(key: string, value: T): void {
      try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  
    static getItem<T>(key: string, defaultValue: T | null = null): T | null {
      try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) {
          return defaultValue;
        }
        return JSON.parse(serializedValue) as T;
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
      }
    }
  
    static removeItem(key: string): void {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing from localStorage:', error);
      }
    }
  
    static clear(): void {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    }
  }