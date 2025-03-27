// src/domain/usecases/user/GetUserUseCase.ts
import { User } from '../../entities/user';

export interface GetUserUseCase {
  execute(id: string): Promise<User>;
}