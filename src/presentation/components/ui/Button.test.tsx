import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  it('renders with default props', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });
  
  it('renders with primary variant', () => {
    render(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByText('Primary Button');
    expect(button).toHaveClass('bg-sky-500');
  });
  
  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByText('Secondary Button');
    expect(button).toHaveClass('bg-violet-500');
  });
  
  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    
    fireEvent.click(screen.getByText('Clickable Button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('respects disabled state', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled Button</Button>);
    
    const button = screen.getByText('Disabled Button');
    expect(button).toBeDisabled();
    
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});