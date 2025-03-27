// src/infrastructure/storage/sessionStorage.ts
export class SessionStorageService {
    static setItem<T>(key: string, value: T): void {
      try {
        const serializedValue = JSON.stringify(value);
        sessionStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error('Error saving to sessionStorage:', error);
      }
    }
  
    static getItem<T>(key: string, defaultValue: T | null = null): T | null {
      try {
        const serializedValue = sessionStorage.getItem(key);
        if (serializedValue === null) {
          return defaultValue;
        }
        return JSON.parse(serializedValue) as T;
      } catch (error) {
        console.error('Error reading from sessionStorage:', error);
        return defaultValue;
      }
    }
  
    static removeItem(key: string): void {
      try {
        sessionStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing from sessionStorage:', error);
      }
    }
  
    static clear(): void {
      try {
        sessionStorage.clear();
      } catch (error) {
        console.error('Error clearing sessionStorage:', error);
      }
    }
  }