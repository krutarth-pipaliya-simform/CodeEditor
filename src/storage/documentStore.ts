import { getDB } from "../storage/index.js";
import type { Doc } from "../types/storageTypes.js";

export function addDocument(doc: Doc): Promise<void> {
  return new Promise((resolve, reject) => {
    const tx = getDB().transaction("documents", "readwrite");
    const store = tx.objectStore("documents");

    const req = store.add(doc);
    //if succeeds then this else error
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export function updateDocument(doc: Doc): Promise<void> {
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

export function getDocument(id: number): Promise<Doc | undefined> {
  return new Promise((resolve, reject) => {
    const tx = getDB().transaction("documents", "readonly");
    const store = tx.objectStore("documents");

    const req = store.get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
