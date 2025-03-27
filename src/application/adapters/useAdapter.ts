// src/application/adapters/userAdapter.ts
import { User } from '../../domain/entities/user';

// Converts API data structure to our domain model
export const userAdapter = {
  toDomain(apiUser: any): User {
    return {
      id: apiUser.id || apiUser._id,
      name: apiUser.name,
      email: apiUser.email,
      role: apiUser.role,
      createdAt: apiUser.created_at ? new Date(apiUser.created_at) : new Date(),
      updatedAt: apiUser.updated_at ? new Date(apiUser.updated_at) : new Date(),
      isActive: apiUser.is_active ?? true
    };
  },

  // Converts our domain model to API expected format
  toApi(user: Partial<User>): any {
    return {
      ...(user.id && { id: user.id }),
      ...(user.name && { name: user.name }),
      ...(user.email && { email: user.email }),
      ...(user.role && { role: user.role }),
      ...(user.isActive !== undefined && { is_active: user.isActive })
    };
  },

  // Converts an array of API users to domain users
  toDomainList(apiUsers: any[]): User[] {
    return apiUsers.map(this.toDomain);
  }
};