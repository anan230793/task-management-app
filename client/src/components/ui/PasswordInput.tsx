import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { Input } from './Input';

interface PasswordInputProps {
  label: string;
  placeholder: string;
  autoComplete: string;
  error?: FieldError | string;
  hint?: string;
  registration: UseFormRegisterReturn;
}

export const PasswordInput = ({
  label,
  placeholder,
  autoComplete,
  error,
  hint,
  registration,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const errorMessage = typeof error === 'string' ? error : error?.message;

  return (
    <div>
      <Input
        label={label}
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
        autoComplete={autoComplete}
        aria-label={label}
        error={errorMessage}
        {...registration}
        rightElement={
          <button
            type="button"
            className="text-ink-secondary transition hover:text-ink-primary"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        }
      />
      {!errorMessage && hint ? (
        <p className="mt-1.5 text-xs text-ink-secondary">{hint}</p>
      ) : null}
    </div>
  );
};
