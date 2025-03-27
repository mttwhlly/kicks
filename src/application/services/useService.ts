// src/application/services/userService.ts
import { User } from '../../domain/entities/user';
import { userRepository } from '../../infrastructure/repositories/userRepositoryImpl';

export const userService = {
  getUsers: async (): Promise<User[]> => {
    return userRepository.getUsers();
  },
  
  getUserById: async (id: string): Promise<User> => {
    return userRepository.getUserById(id);
  },
  
  createUser: async (user: User): Promise<User> => {
    return userRepository.createUser(user);
  },
  
  updateUser: async (id: string, user: Partial<User>): Promise<User> => {
    return userRepository.updateUser(id, user);
  },
  
  deleteUser: async (id: string): Promise<void> => {
    return userRepository.deleteUser(id);
  }
};