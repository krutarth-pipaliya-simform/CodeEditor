import { getDB } from "../storage/index.js";
import type { Operations } from "../types/storageTypes.js";

export function addOperation(op: Operations): Promise<void> {
    return new Promise((resolve, reject) => {
        const tx = getDB().transaction("operations", "readwrite");
        const store = tx.objectStore("operations");
        const req = store.add(op);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}

export function getOperations(docId: number): Promise<Operations[]> {
    return new Promise((resolve, reject) => {
        const tx = getDB().transaction("operations", "readonly");
        const store = tx.objectStore("operations");
        const index = store.index("documentId");
        const req = index.getAll(docId);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

export function deleteOperation(opId: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const tx = getDB().transaction("operations", "readwrite");
        const store = tx.objectStore("operations");
        const req = store.delete(opId);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}
