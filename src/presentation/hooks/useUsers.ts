// src/application/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from '../di/container';
import { UserRepository } from '../../domain/repositories/userRepository';

export const useUsers = () => {
  const userRepository = container.get<UserRepository>('UserRepository');
  const queryClient = useQueryClient();
  
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => userRepository.getUsers()
  });
  
  const createUserMutation = useMutation({
    mutationFn: (userData) => userRepository.createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
  
  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    createUser: createUserMutation.mutate
  };
};