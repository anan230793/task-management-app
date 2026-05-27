import { PropsWithChildren, ReactNode } from 'react';

import { useModalA11y } from '../../hooks/useModalA11y';
import clsx from 'clsx';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  labelledBy?: string;
  describedBy?: string;
  maxWidth?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const maxWidthClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-xl',
};

export const BaseModal = ({
  isOpen,
  onClose,
  labelledBy,
  describedBy,
  maxWidth = 'md',
  children,
}: PropsWithChildren<BaseModalProps>) => {
  const { dialogRef } = useModalA11y(isOpen, onClose);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        className={clsx(
          'modal-enter flex max-h-[min(90vh,640px)] w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-surface-border bg-white p-6 shadow-xl',
          maxWidthClasses[maxWidth],
        )}
      >
        {children}
      </div>
    </div>
  );
};
