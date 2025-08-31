import { cn } from '@/lib/classnames';
import React, { useState } from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  iconClassName?: string;
  defaultValue?: string | number;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = 'Select an option',
  onChange,
  className = '',
  iconClassName = 'mr-4',
  defaultValue = '',
}) => {
  // Manage the selected value
  const [selectedValue, setSelectedValue] = useState<string | number>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value); // Trigger parent handler
  };

  return (
    <div className="relative flex items-center">
      <select
        className={cn(
          'h-11 w-full appearance-none rounded-lg border border-gray-300  px-4 py-2.5 pr-11 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
          selectedValue ? 'text-gray-800 dark:text-white/90' : 'text-gray-400 dark:text-gray-400',
          className,
        )}
        value={selectedValue}
        onChange={handleChange}
      >
        {/* Placeholder option */}
        <option value="" disabled className="text-gray-400 dark:bg-gray-900 dark:text-white/30">
          {placeholder}
        </option>
        {/* Map over options */}
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
            className="text-gray-700 dark:bg-gray-900 dark:text-gray-400 appearance-none"
          >
            {option.label}
          </option>
        ))}
      </select>
      <span
        className={cn('ml-auto absolute right-0 text-gray-800 dark:text-white/90', iconClassName)}
      >
        ▾
      </span>
    </div>
  );
};

export default Select;
