// src/domain/entities/product.ts
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string[];
    imageUrl?: string;
    inventory: number;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
  }