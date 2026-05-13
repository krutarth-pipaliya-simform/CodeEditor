import type { Document, Operations } from "./storageTypes.js";

export const editorState: {
    currentDocument: Document;
    appliedOperations: Set<string>;
    undoStack: Operations[];
    redoStack: Operations[];
} = {
    currentDocument: {
        id: "doc-1",
        title: "Untitled",
        content: "",
        updatedAt: Date.now(),
    },

    appliedOperations: new Set(),
    undoStack: [],
    redoStack: [],
};
