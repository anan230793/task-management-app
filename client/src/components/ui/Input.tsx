import { forwardRef, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';

import clsx from 'clsx';

interface BaseProps {
  label?: string;
  error?: string;
  rightElement?: ReactNode;
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true };

const fieldClasses =
  'w-full rounded-lg border border-surface-border bg-white px-3 py-2 text-sm text-ink-primary shadow-sm transition focus:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, rightElement, className, ...props }, ref) => {
    return (
      <label className="block space-y-1.5">
        {label ? <span className="text-sm font-medium text-ink-primary">{label}</span> : null}
        <div className="relative">
          <input
            ref={ref}
            className={clsx(fieldClasses, rightElement ? 'pr-10' : '', className)}
            {...props}
          />
          {rightElement ? <span className="absolute inset-y-0 right-2 flex items-center">{rightElement}</span> : null}
        </div>
        {error ? <span className="text-xs text-danger">{error}</span> : null}
      </label>
    );
  },
);

Input.displayName = 'Input';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <label className="block space-y-1.5">
        {label ? <span className="text-sm font-medium text-ink-primary">{label}</span> : null}
        <textarea ref={ref} className={clsx(fieldClasses, className)} {...props} />
        {error ? <span className="text-xs text-danger">{error}</span> : null}
      </label>
    );
  },
);

Textarea.displayName = 'Textarea';
