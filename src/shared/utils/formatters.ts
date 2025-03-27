// src/shared/utils/formatters.ts
export const formatters = {
    currency: (amount: number, currency = 'USD'): string => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
      }).format(amount);
    },
  
    date: (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
      const dateObject = typeof date === 'string' ? new Date(date) : date;
      return new Intl.DateTimeFormat('en-US', options).format(dateObject);
    },
  
    percentage: (value: number): string => {
      return `${(value * 100).toFixed(2)}%`;
    },
  
    truncate: (text: string, maxLength = 50): string => {
      if (text.length <= maxLength) return text;
      return `${text.slice(0, maxLength)}...`;
    },
  
    fileSize: (bytes: number): string => {
      if (bytes === 0) return '0 Bytes';
      
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      
      return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
    }
  };