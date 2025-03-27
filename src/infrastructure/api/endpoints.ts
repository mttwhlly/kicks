// src/infrastructure/api/endpoints.ts
// Centralized place to define API endpoints
export const endpoints = {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      refreshToken: '/auth/refresh-token',
      forgotPassword: '/auth/forgot-password',
      resetPassword: '/auth/reset-password',
    },
    
    users: {
      base: '/users',
      getById: (id: string) => `/users/${id}`,
      updateById: (id: string) => `/users/${id}`,
      deleteById: (id: string) => `/users/${id}`,
    },
    
    products: {
      base: '/products',
      getById: (id: string) => `/products/${id}`,
      updateById: (id: string) => `/products/${id}`,
      deleteById: (id: string) => `/products/${id}`,
      search: '/products/search',
    },
    
    orders: {
      base: '/orders',
      getById: (id: string) => `/orders/${id}`,
      updateById: (id: string) => `/orders/${id}`,
      cancelById: (id: string) => `/orders/${id}/cancel`,
      userOrders: (userId: string) => `/users/${userId}/orders`,
    },
  };