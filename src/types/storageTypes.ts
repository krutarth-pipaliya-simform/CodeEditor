export type Document = {
    id: number;
    title: string;
    content: string;
    updatedAt: number;
};

export const operationTypes = {
    insert: "insert",
    update: "update",
    delete: "delete",
} as const;

export type OperationType =
    (typeof operationTypes)[keyof typeof operationTypes];

export type position = {
    row: number;
    column: number;
};
export type Operations = {
    operationId: string;
    documentId: number;
    userId: string;
    type: OperationType;
    position: position;
    value: string;
    timestamp: number;
};

export type Cursor = {
    cursorId: string; // userId or tabId
    documentId: number;
    userId: string;
    position: number;
    updatedAt: number;
};

export type Tab = {
    tabId: string;
    documentId: number;
    lastSeen: number;
};

export type User = {
    userId: string;
    username: string;
    createdAt: number;
};
