import { getDB } from "./index.js";
import type { User } from "../types/storageTypes.js";

export function addUser(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
        const tx = getDB().transaction("users", "readwrite");
        const store = tx.objectStore("users");

        const req = store.put(user);

        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}

export function getUser(userId: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
        const tx = getDB().transaction("users", "readonly");
        const store = tx.objectStore("users");

        const req = store.get(userId);

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}
