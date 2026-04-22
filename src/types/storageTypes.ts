export type Doc = {
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

export type Op = {
  opId: string;
  docId: number;
  userId: string;
  type: OperationType;
  position: number;
  value: string;
  timestamp: number;
};

export type Cursor = {
  cursorId: string;   // userId or tabId
  docId: number;
  userId: string;
  position: number;
  updatedAt: number;
};

export type Tab = {
  tabId: string;
  docId: number;
  lastSeen: number;
};

export type User = {
  userId: string;
  username: string;
  createdAt: number;
};