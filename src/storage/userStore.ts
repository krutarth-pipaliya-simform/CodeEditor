import { getDB } from "./index.js";
import type { User } from "../types/storageTypes.js";

export function addUser(username: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const tx = getDB().transaction("users", "readwrite");
        const store = tx.objectStore("users");
        const user={
            username
        }
        const req = store.put(user);

        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}

export function getUser(username: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
        const tx = getDB().transaction("users", "readonly");
        const store = tx.objectStore("users");
        const index=store.index("username")
        const req = index.get(username);

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

export function getAllUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
        const tx = getDB().transaction("users", "readonly");
        const store = tx.objectStore("users");
        const req = store.getAll();

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}
