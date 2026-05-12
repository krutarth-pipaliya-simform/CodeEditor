import { generateRandomId } from "../events/randomIdGenerator.js";
import { getDB } from "../storage/index.js";
import type { Document } from "../types/storageTypes.js";

export function createDocument(name: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const tx = getDB().transaction("documents", "readwrite");
        const store = tx.objectStore("documents");

        const doc = {
            id: generateRandomId(),
            title: name,
            content: "",
            updatedAt: Date.now(),
        };

        const req = store.add(doc);
        //if succeeds then this else error
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}

export function updateDocument(doc: Document): Promise<void> {
    return new Promise((resolve, reject) => {
        const tx = getDB().transaction("documents", "readwrite");
        const store = tx.objectStore("documents");
        const req = store.put(doc);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}

export function deleteDocument(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
        const tx = getDB().transaction("documents", "readwrite");
        const store = tx.objectStore("documents");
        const req = store.delete(id);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}

export function getDocument(title: string): Promise<Document | undefined> {
    return new Promise((resolve, reject) => {
        const tx = getDB().transaction("documents", "readonly");
        const store = tx.objectStore("documents");
        const index = store.index("title");
        const req = index.get(title);

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

export function getAllDocuments(): Promise<Document[] | undefined> {
    return new Promise((resolve, reject) => {
        const tx = getDB().transaction("documents", "readonly");
        const store = tx.objectStore("documents");
        const req = store.getAll();

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}
