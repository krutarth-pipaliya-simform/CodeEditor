import { getCurrentFile } from "../render/renderCurrentFile.js";
import { getDocument } from "../storage/documentStore.js";
import type { Document, Operations } from "./storageTypes.js";

export const editorState: {
    currentDocument: Document;
    appliedOperations: Set<string>;
    undoStack: Operations[];
    redoStack: Operations[];
} = {
    currentDocument: {
        id: "",
        title: "",
        content: "",
        updatedAt: Date.now(),
    },

    appliedOperations: new Set(),
    undoStack: [],
    redoStack: [],
};
export async function setContent() {
    const doc = await getDocument(getCurrentFile());
    if (!doc) return;
    editorState.currentDocument = {
        ...doc,
    };
}
