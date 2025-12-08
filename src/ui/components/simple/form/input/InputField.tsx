import { cn } from '@/lib/classnames';
import React, { forwardRef } from 'react';

interface InputProps {
  type?: 'text' | 'number' | 'email' | 'password' | 'date' | 'time' | string;
  id?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
  size?: 'sm' | 'md' | 'lg';
}

// 🔥 forwardRef agar bisa akses DOM <input>
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      id,
      name,
      required,
      placeholder,
      value,
      defaultValue,
      onChange,
      onBlur,
      className = '',
      min,
      max,
      step,
      disabled = false,
      success = false,
      error = false,
      hint,
      size,
    },
    ref,
  ) => {
    const getSizeClass = (size: 'sm' | 'md' | 'lg' = 'md') => {
      switch (size) {
        case 'sm':
          return 'h-9 text-sm px-3 py-2';
        case 'lg':
          return 'h-14 text-lg px-5 py-3';
        case 'md':
        default:
          return 'h-11 text-base px-4 py-2.5';
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (type === 'number') {
        if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') {
          e.preventDefault();
        }
      }
    };

    let inputClasses =
      'h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden dark:bg-gray-900 dark:text-white/90';

    if (disabled) {
      inputClasses +=
        ' text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
    } else if (error) {
      inputClasses +=
        ' text-error-800 border-error-500 focus:ring-3 focus:ring-error-500/10  dark:text-error-400 dark:border-error-500';
    } else if (success) {
      inputClasses +=
        ' text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300  dark:text-success-400 dark:border-success-500';
    } else {
      inputClasses +=
        ' bg-transparent text-gray-800 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90';
    }

    return (
      <div className="relative">
        <input
          ref={ref} // ⬅️ Ref diteruskan ke input DOM
          type={type}
          id={id}
          name={name}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          value={value}
          className={cn(inputClasses, getSizeClass(size), className)}
        />

        {hint && (
          <p
            className={`mt-1.5 text-xs ${
              error ? 'text-error-500' : success ? 'text-success-500' : 'text-gray-500'
            }`}
          >
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
