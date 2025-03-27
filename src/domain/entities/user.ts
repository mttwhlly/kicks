// src/domain/entities/user.ts
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'editor' | 'viewer';
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
  }