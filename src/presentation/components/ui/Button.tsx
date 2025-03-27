import { Button as MuiButton, ButtonProps } from '@mui/material';
import classNames from 'classnames';

export interface CustomButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
}

export const Button = ({ 
  variant = 'primary', 
  className,
  ...props 
}: CustomButtonProps) => {
  return (
    <MuiButton
      className={classNames(
        'font-medium',
        {
          'bg-sky-500 hover:bg-sky-600': variant === 'primary',
          'bg-violet-500 hover:bg-violet-600': variant === 'secondary',
          'bg-green-500 hover:bg-green-600': variant === 'success',
          'bg-red-500 hover:bg-red-600': variant === 'danger',
        },
        className
      )}
      {...props}
    />
  );
};