// src/shared/utils/validation.ts
export const validation = {
    email: (email: string): boolean => {
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return regex.test(email);
    },
  
    password: (password: string): boolean => {
      // At least 8 characters, one uppercase, one lowercase, one number, one special
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    },
  
    url: (url: string): boolean => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    },
  
    phone: (phone: string): boolean => {
      const regex = /^\+?[1-9]\d{1,14}$/;
      return regex.test(phone);
    }
  };