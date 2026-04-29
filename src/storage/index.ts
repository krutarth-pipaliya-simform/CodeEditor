const DB_NAME = "CodeEditor";
const DB_VERSION = 1;

let db: IDBDatabase | null = null;

export function initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            try{
            const target=event.target;
            if(!target|| !(target instanceof IDBOpenDBRequest))
            {
                throw new Error ("Event not captured properly")
            }
            const db = target.result;

            // Documents
            if (!db.objectStoreNames.contains("documents")) {
                const docStore = db.createObjectStore("documents", {
                    keyPath: "id",
                });
                //unique by name
                docStore.createIndex("title", "title", { unique: true });
            }

            // Operations
            if (!db.objectStoreNames.contains("operations")) {
                const opStore = db.createObjectStore("operations", {
                    keyPath: "operationId",
                });
                opStore.createIndex("documentId", "documentId", { unique: false });
            }

            // Tabs
            if (!db.objectStoreNames.contains("tabs")) {
                db.createObjectStore("tabs", { keyPath: "tabId" });
            }

            // Users
            if (!db.objectStoreNames.contains("users")) {
               const userStore= db.createObjectStore("users", {
                    keyPath: "username",
                });
                userStore.createIndex("username","username",{unique:true})
            }
        }
        catch(err)
        {
            console.error(err)   
        }
    }
        

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
