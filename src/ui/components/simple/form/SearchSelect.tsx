'use client';

import { cn } from '@/lib/classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';

type SelectOption = { label: string; value: string };
type SearchSelectProps = {
  data: SelectOption[] | undefined;
  selected: SelectOption | null;
  onSelect: (item: SelectOption) => void;
  onSearchNotFound?: (searchTerm: string) => void;
  disabledValues?: string[];
  debounceDelay?: number;
  className?: string;
  loading?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const DROPDOWN_ESTIMATED_HEIGHT = 300;

const SearchSelect: React.FC<SearchSelectProps> = ({
  data,
  selected,
  onSelect,
  onSearchNotFound,
  disabledValues = [],
  debounceDelay = 300,
  className = '',
  loading,
  onBlur,
}) => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [debouncedFilter, setDebouncedFilter] = useState('');
  const [isLoading, setIsLoading] = useState(loading);
  const [dropdownPosition, setDropdownPosition] = useState<'top' | 'bottom'>('bottom');
  const [animationState, setAnimationState] = useState<'closed' | 'opening' | 'opened'>('closed');

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setDebouncedFilter(keyword);
      setIsLoading(false);
    }, debounceDelay);
    return () => {
      clearTimeout(handler);
      setIsLoading(false);
    };
  }, [keyword, debounceDelay]);

  const filteredList = useMemo(() => {
    return data?.filter(item => item.label.toLowerCase().includes(debouncedFilter.toLowerCase()));
  }, [debouncedFilter, data]);

  useEffect(() => {
    if (onSearchNotFound) {
      if (debouncedFilter && filteredList?.length === 0) {
        onSearchNotFound(debouncedFilter);
      } else if (debouncedFilter === '') {
        onSearchNotFound('');
      }
    }
  }, [debouncedFilter, filteredList, onSearchNotFound]);

  const handleSelect = (item: SelectOption) => {
    if (disabledValues.includes(item.value)) return;
    onSelect(item);
    setOpen(false);
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
    } else {
      setAnimationState('closed');
    }
  }, [open]);

  return (
    <div ref={wrapperRef} className={cn('relative w-full', className)}>
      <input
        type="hidden"
        name="selectfield"
        value={selected?.value || ''}
        onBlur={onBlur && onBlur}
      />

      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        ref={buttonRef}
        className={cn(
          'w-full h-11 px-4 py-2.5 text-left bg-white border border-gray-300 rounded-lg text-sm md:text-base shadow-theme-xs placeholder:text-gray-400',
          'dark:bg-gray-900 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30',
          selected ? 'text-gray-800 dark:text-white/90' : 'text-gray-400 dark:text-gray-400',
        )}
      >
        {selected?.label || 'Please Select'}
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          'absolute z-10 w-full border rounded-lg shadow-lg bg-white overflow-hidden',
          'transition-all duration-200 transform',
          dropdownPosition === 'top'
            ? 'origin-bottom bottom-full mb-2'
            : 'origin-top top-full mt-1',
          'dark:bg-gray-900 dark:border-gray-700',

          // animation state
          animationState === 'opening' && 'scale-y-100 opacity-100 pointer-events-auto',
          animationState === 'opened' && 'scale-y-100 opacity-100 pointer-events-auto',
          animationState === 'closed' && 'scale-y-0 opacity-0 pointer-events-none',
        )}
        style={{
          maxHeight: DROPDOWN_ESTIMATED_HEIGHT,
        }}
      >
        {/* Search input */}
        <div className="relative px-2 pt-2">
          <input
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="Search..."
            className={cn(
              'h-11 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm md:text-base text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10',
              'dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
            )}
          />
          {isLoading && (
            <div className="absolute top-1/2 right-4 -translate-y-1/2">
              <svg
                className="animate-spin h-5 w-5 text-gray-400 dark:text-gray-300"
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

        {/* List */}
        <div className="px-2 pb-2">
          {filteredList && filteredList?.length > 0 ? (
            <ul className="max-h-60 overflow-auto mt-2">
              {filteredList?.map(item => {
                const isDisabled = disabledValues.includes(item.value);
                const isSelected = selected?.value === item.value;
                return (
                  <li
                    key={item.value}
                    onClick={() => handleSelect(item)}
                    className={cn(
                      'cursor-pointer px-3 py-2 rounded-md text-sm md:text-base',
                      isDisabled
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                        : isSelected
                          ? 'bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700',
                    )}
                  >
                    {item.label}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-sm text-gray-500 dark:text-white/50 text-center py-3">
              No results found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSelect;
