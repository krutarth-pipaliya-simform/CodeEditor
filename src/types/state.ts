import { getCurrentFile } from "../render/renderCurrentFile.js";
import { getDocument } from "../storage/documentStore.js";
import type { Document, Operations } from "./storageTypes.js";

export const editorState: {
    currentDocument: Document;
    appliedOperations: Set<string>;
} = {
    currentDocument: {
        id: "",
        title: "",
        content: "",
        updatedAt: Date.now(),
        undoStack: [],
        redoStack: [],
    },

    appliedOperations: new Set(),
};
export async function setContent() {
    const doc = await getDocument(getCurrentFile());
    if (!doc) return;
    editorState.currentDocument = {
        ...doc,
    };
}
