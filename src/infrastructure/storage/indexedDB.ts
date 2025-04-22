// src/infrastructure/storage/indexedDB.ts
export class IndexedDBService {
    private dbName: string;
    private dbVersion: number;
    private stores: { name: string; keyPath: string }[];
    private db: IDBDatabase | null = null;
  
    constructor(
      dbName: string,
      dbVersion: number,
      stores: { name: string; keyPath: string }[]
    ) {
      this.dbName = dbName;
      this.dbVersion = dbVersion;
      this.stores = stores;
    }
  
    async connect(): Promise<IDBDatabase> {
      return new Promise((resolve, reject) => {
        if (this.db) {
          resolve(this.db);
          return;
        }
  
        const request = indexedDB.open(this.dbName, this.dbVersion);
  
        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          
          this.stores.forEach(store => {
            if (!db.objectStoreNames.contains(store.name)) {
              db.createObjectStore(store.name, { keyPath: store.keyPath });
            }
          });
        };
  
        request.onsuccess = (event) => {
          this.db = (event.target as IDBOpenDBRequest).result;
          resolve(this.db);
        };
  
        request.onerror = (event) => {
          reject((event.target as IDBOpenDBRequest).error);
        };
      });
    }
  
    async add<T>(storeName: string, data: T): Promise<IDBValidKey> {
      const db = await this.connect();
      
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.add(data);
  
        request.onsuccess = () => {
          resolve(request.result);
        };
  
        request.onerror = () => {
          reject(request.error);
        };
      });
    }
  
    async getAll<T>(storeName: string): Promise<T[]> {
      const db = await this.connect();
      
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();
  
        request.onsuccess = () => {
          resolve(request.result as T[]);
        };
  
        request.onerror = () => {
          reject(request.error);
        };
      });
    }
  
    async getById<T>(storeName: string, id: IDBValidKey): Promise<T | null> {
      const db = await this.connect();
      
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(id);
  
        request.onsuccess = () => {
          resolve(request.result as T || null);
        };
  
        request.onerror = () => {
          reject(request.error);
        };
      });
    }
  
    async update<T>(storeName: string, data: T): Promise<IDBValidKey> {
      const db = await this.connect();
      
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(data);
  
        request.onsuccess = () => {
          resolve(request.result);
        };
  
        request.onerror = () => {
          reject(request.error);
        };
      });
    }
  
    async delete(storeName: string, id: IDBValidKey): Promise<void> {
      const db = await this.connect();
      
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(id);
  
        request.onsuccess = () => {
          resolve();
        };
  
        request.onerror = () => {
          reject(request.error);
        };
      });
    }
  
    async clear(storeName: string): Promise<void> {
      const db = await this.connect();
      
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.clear();
  
        request.onsuccess = () => {
          resolve();
        };
  
        request.onerror = () => {
          reject(request.error);
        };
      });
    }
  
    close(): void {
      if (this.db) {
        this.db.close();
        this.db = null;
      }
    }
  }
  
  // Usage example:
  // const dbService = new IndexedDBService('myApp', 1, [
  //   { name: 'users', keyPath: 'id' }
  // ]);