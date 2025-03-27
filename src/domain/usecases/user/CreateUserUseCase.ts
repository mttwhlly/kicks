// src/domain/usecases/user/CreateUserUseCase.ts
import { User } from '../../entities/user';

export interface CreateUserInput {
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

export interface CreateUserUseCase {
  execute(input: CreateUserInput): Promise<User>;
}