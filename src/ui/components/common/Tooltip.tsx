import { cn } from '@/lib/classnames';
import { ReactNode, useEffect, useRef, useState } from 'react';

type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  open?: boolean;
  defaultOpen?: boolean;
  sideClassName?: string;
  alwaysClose?: boolean;
};

const Tooltip = ({
  children,
  content,
  side = 'top',
  open,
  defaultOpen = false,
  sideClassName,
  alwaysClose = false,
}: TooltipProps) => {
  const [openState, setOpenState] = useState<boolean>(defaultOpen);
  const timeoutRef = useRef<number | null>(null);
  const isControlled = typeof open !== 'undefined';
  const isOpen = isControlled ? open : openState;

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  function forceClose() {
    if (isControlled) return;
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setOpenState(false);
  }

  function openTooltip() {
    if (alwaysClose) return forceClose(); // ⛔ Tidak boleh dibuka
    if (isControlled) return;
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setOpenState(true);
  }

  function closeTooltipSoon() {
    if (alwaysClose) return forceClose(); // ⛔ Tutup langsung
    if (isControlled) return;
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setOpenState(false), 120);
  }

  const sideClass = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  }[side];

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltipSoon}
        onFocus={openTooltip}
        onBlur={closeTooltipSoon}
        className="inline-block"
      >
        {children}
      </div>

      <div
        role="tooltip"
        aria-hidden={!isOpen}
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltipSoon}
        className={cn(
          'absolute z-20 rounded-lg p-3 bg-white border border-gray-200 shadow-lg text-sm transition-all duration-150 transform',
          sideClass,
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none',
          sideClassName,
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
