const DB_NAME = "CodeEditor";
const DB_VERSION = 1;

let db: IDBDatabase | null = null;

export function initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result;

            // Documents
            if (!db.objectStoreNames.contains("documents")) {
                const docStore = db.createObjectStore("documents", {
                    keyPath: "id",
                });
                docStore.createIndex("updatedAt", "updatedAt", {
                    unique: false,
                });
            }

            // Operations
            if (!db.objectStoreNames.contains("operations")) {
                const opStore = db.createObjectStore("operations", {
                    keyPath: "operationId",
                });
                opStore.createIndex("docId", "docId", { unique: false });
            }

            // Tabs
            if (!db.objectStoreNames.contains("tabs")) {
                db.createObjectStore("tabs", { keyPath: "tabId" });
            }

            // Users
            if (!db.objectStoreNames.contains("users")) {
                db.createObjectStore("users", {
                    keyPath: "userId",
                });
            }
        };

        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        };

        request.onerror = () => reject(request.error);
    });
}

export function getDB(): IDBDatabase {
    if (!db) {
        throw new Error("DB not initialized. Call initDB() first.");
    }
    return db;
}
