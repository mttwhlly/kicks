// src/infrastructure/api/UserApi.ts
import { api } from './apiConfig';
import { endpoints } from './endpoints';
import { User } from '../../domain/entities/user';

export interface CreateUserDto {
  name: string;
  email: string;
  role: string;
  password: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: string;
  isActive?: boolean;
}

export const UserApi = {
  getAll: async () => {
    const response = await api.get<{ users: User[] }>(endpoints.users.base);
    return response.data.users;
  },
  
  getById: async (id: string) => {
    const response = await api.get<{ user: User }>(endpoints.users.getById(id));
    return response.data.user;
  },
  
  create: async (userData: CreateUserDto) => {
    const response = await api.post<{ user: User }>(endpoints.users.base, userData);
    return response.data.user;
  },
  
  update: async (id: string, userData: UpdateUserDto) => {
    const response = await api.put<{ user: User }>(endpoints.users.updateById(id), userData);
    return response.data.user;
  },
  
  delete: async (id: string) => {
    await api.delete(endpoints.users.deleteById(id));
    return true;
  }
};