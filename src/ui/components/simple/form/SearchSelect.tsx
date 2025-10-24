'use client';

import { cn } from '@/lib/classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';

type SelectOption = { label: string; value: string };

type BaseProps = {
  data?: SelectOption[];
  onSearchNotFound?: (searchTerm: string) => void;
  disabledValues?: string[];
  debounceDelay?: number;
  className?: string;
  loading?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  hint?: string;
};

type SingleSelectProps = BaseProps & {
  isMultiple?: false;
  selected: SelectOption | null;
  onSelect: (item: SelectOption) => void;
};

type MultiSelectProps = BaseProps & {
  isMultiple: true;
  selected: SelectOption[];
  onSelect: (items: SelectOption[]) => void;
};

type SearchSelectProps = SingleSelectProps | MultiSelectProps;

const DROPDOWN_ESTIMATED_HEIGHT = 300;

const SearchSelect: React.FC<SearchSelectProps> = ({
  data,
  selected,
  onSelect,
  isMultiple = false,
  onSearchNotFound,
  disabledValues = [],
  debounceDelay = 300,
  className,
  loading,
  onBlur,
  placeholder = 'Please Select',
  size,
  error,
  hint,
}) => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [debouncedFilter, setDebouncedFilter] = useState('');
  const [isLoading, setIsLoading] = useState(loading ?? false);
  const [dropdownPosition, setDropdownPosition] = useState<'top' | 'bottom'>('bottom');
  const [animationState, setAnimationState] = useState<'closed' | 'opening' | 'opened'>('closed');

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const getSizeClass = (size: 'sm' | 'md' | 'lg' = 'md') => {
    switch (size) {
      case 'sm':
        return {
          button: 'h-9 text-sm px-4 py-2',
          input: 'h-9 text-sm px-3 py-2',
          item: 'text-sm px-3 py-2',
        };
      case 'lg':
        return {
          button: 'h-14 text-lg px-4 py-3',
          input: 'h-14 text-lg px-5 py-3',
          item: 'text-lg px-5 py-3',
        };
      default:
        return {
          button: 'min-h-11 text-base px-4 py-1',
          input: 'h-11 text-base px-4 py-2.5',
          item: 'text-base px-4 py-2.5',
        };
    }
  };

  const sizeClasses = getSizeClass(size);

  // debounce keyword
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setDebouncedFilter(keyword);
      setIsLoading(false);
    }, debounceDelay);
    return () => clearTimeout(handler);
  }, [keyword, debounceDelay]);

  // sync isLoading with prop
  useEffect(() => {
    if (loading !== undefined) setIsLoading(loading);
  }, [loading]);

  const filteredList = useMemo(
    () =>
      data?.filter(item => item.label.toLowerCase().includes(debouncedFilter.toLowerCase())) ?? [],
    [debouncedFilter, data],
  );

  useEffect(() => {
    if (onSearchNotFound) {
      if (debouncedFilter && filteredList.length === 0) {
        onSearchNotFound(debouncedFilter);
      } else if (debouncedFilter === '') {
        onSearchNotFound('');
      }
    }
  }, [debouncedFilter, filteredList, onSearchNotFound]);

  /** Single select handler */
  const handleSelect = (item: SelectOption) => {
    if (disabledValues.includes(item.value)) return;
    (onSelect as (item: SelectOption) => void)(item); // cast ke single
    setOpen(false);
  };

  /** Multiple select handler */
  const toggleSelect = (item: SelectOption) => {
    if (disabledValues.includes(item.value)) return;
    const selectedArr = Array.isArray(selected) ? selected : [];
    const exists = selectedArr.some(sel => sel.value === item.value);
    const newArr = exists
      ? selectedArr.filter(sel => sel.value !== item.value)
      : [...selectedArr, item];

    (onSelect as (items: SelectOption[]) => void)(newArr); // cast ke multi
  };

  const removeSelected = (value: string) => {
    if (!Array.isArray(selected)) return;
    (onSelect as (items: SelectOption[]) => void)(selected.filter(sel => sel.value !== value));
  };

  const updateDropdownPosition = () => {
    if (!open || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    setDropdownPosition(
      spaceBelow < DROPDOWN_ESTIMATED_HEIGHT && spaceAbove > DROPDOWN_ESTIMATED_HEIGHT
        ? 'top'
        : 'bottom',
    );
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(updateDropdownPosition, [open]);
  useEffect(() => {
    const onResize = () => window.requestAnimationFrame(updateDropdownPosition);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open]);

  useEffect(() => {
    if (open) {
      setAnimationState('opening');
      const timeout = setTimeout(() => setAnimationState('opened'), 100);
      return () => clearTimeout(timeout);
    }
    setAnimationState('closed');
  }, [open]);

  return (
    <div ref={wrapperRef} className={cn('relative w-full', className)}>
      <input
        type="hidden"
        name="selectfield"
        value={
          isMultiple
            ? Array.isArray(selected)
              ? selected.map(s => s.value).join(',')
              : ''
            : (selected as SelectOption | null)?.value || ''
        }
        onBlur={onBlur}
      />

      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        ref={buttonRef}
        className={cn(
          'w-full text-left bg-white border border-gray-300 rounded-lg shadow-theme-xs flex flex-wrap gap-1 items-center',
          sizeClasses.button,
          'dark:bg-gray-900 dark:border-gray-700 dark:text-white/90',
          selected ? 'text-gray-800 dark:text-white/90' : 'text-gray-400',
        )}
      >
        {isMultiple ? (
          Array.isArray(selected) && selected.length > 0 ? (
            selected.map(item => (
              <span
                key={item.value}
                className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-0.5 text-sm"
                onClick={e => e.stopPropagation()}
              >
                {item.label}
                <span
                  role="button"
                  tabIndex={0}
                  onClick={e => {
                    e.stopPropagation();
                    removeSelected(item.value);
                  }}
                  className="cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  ×
                </span>
              </span>
            ))
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )
        ) : (
          <span>
            {(selected as SelectOption | null)?.label || (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </span>
        )}
        <span className="ml-auto">▾</span>
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          'absolute z-10 w-full border rounded-lg shadow-lg bg-white overflow-hidden transition-all duration-200 transform',
          dropdownPosition === 'top'
            ? 'origin-bottom bottom-full mb-2'
            : 'origin-top top-full mt-1',
          'dark:bg-gray-900 dark:border-gray-700',
          animationState === 'closed'
            ? 'scale-y-0 opacity-0 pointer-events-none'
            : 'scale-y-100 opacity-100 pointer-events-auto',
        )}
        style={{ maxHeight: DROPDOWN_ESTIMATED_HEIGHT }}
      >
        <div className="relative px-2 pt-2">
          <input
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="Search..."
            className={cn(
              'w-full rounded-lg border bg-transparent shadow-theme-xs focus:outline-hidden focus:ring-3 focus:ring-brand-500/10',
              sizeClasses.input,
              'dark:border-gray-700 dark:bg-gray-900 dark:text-white/90',
            )}
          />
          {isLoading && (
            <div className="absolute top-1/2 right-4 -translate-y-1/2">
              <svg
                className="animate-spin h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="opacity-25"
                />
                <path
                  fill="currentColor"
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="px-2 pb-2">
          {filteredList.length > 0 ? (
            <ul className="max-h-60 overflow-auto mt-2 flex flex-col gap-y-1.5">
              {filteredList.map(item => {
                const isDisabled = disabledValues.includes(item.value);
                const isSelected = isMultiple
                  ? Array.isArray(selected) && selected.some(sel => sel.value === item.value)
                  : (selected as SelectOption | null)?.value === item.value;
                return (
                  <li
                    key={item.value}
                    onClick={() => (isMultiple ? toggleSelect(item) : handleSelect(item))}
                    className={cn(
                      'cursor-pointer rounded-md dark:text-white',
                      sizeClasses.item,
                      isDisabled
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700'
                        : isSelected
                          ? 'bg-brand-100 dark:bg-brand-900 text-brand-700'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700',
                    )}
                  >
                    {item.label}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-sm text-gray-500 text-center py-3">No results found</div>
          )}
        </div>
      </div>

      {hint && (
        <p className={`mt-1.5 text-xs ${error ? 'text-error-500' : 'text-gray-500'}`}>{hint}</p>
      )}
    </div>
  );
};

export default SearchSelect;
