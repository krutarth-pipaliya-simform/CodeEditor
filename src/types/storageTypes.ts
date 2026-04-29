export type Document = {
    id: string;
    title: string;
    content: string;
    updatedAt: number;
};

export type OperationType = "insert" | "update" | "delete";

export type position = {
    row: number;
    column: number;
};
export type Operations = {
    operationId: string;
    documentId: number;
    username: string;
    type: OperationType;
    position: position;
    value: string;
    timestamp: number;
};

export type Cursor = {
    cursorId: string; // userId or tabId
    documentId: number;
    username: string;
    position: number;
    updatedAt: number;
};

export type Tab = {
    tabId: string;
    documentId: number;
    lastSeen: number;
};

export type User = {
    username: string;
};
