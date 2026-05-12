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
    documentId: string;
    username: string;
    type: OperationType;
    position: position;
    value: string;
    timestamp: number;
};

export type Cursor = {
    cursorId: string; // userId or tabId
    documentId: string;
    username: string;
    position: number;
    updatedAt: number;
};

export type Tab = {
    tabId: string;
    documentId: string;
    lastSeen: number;
};

export type User = {
    username: string;
};
