import { User } from '../../domain/entities/user';
import { UserRepository } from '../../domain/repositories/userRepository';
import { apiClient } from '../http/client';

export class UserRepositoryImpl implements UserRepository {
  async getUsers(): Promise<User[]> {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  }
  
  // Implement other methods...
}