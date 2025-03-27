// src/domain/usecases/product/SearchProductsUseCase.ts
import { Product } from '../../entities/product';

export interface SearchProductsParams {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  page?: number;
  limit?: number;
  sort?: {
    field: keyof Product;
    direction: 'asc' | 'desc';
  };
}

export interface SearchProductsResult {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export interface SearchProductsUseCase {
  execute(params: SearchProductsParams): Promise<SearchProductsResult>;
}