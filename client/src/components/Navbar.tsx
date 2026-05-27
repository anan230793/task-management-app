import { CheckSquare } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { useCurrentUser, useLogout } from '../hooks/useAuth';
import { Button } from './ui/Button';

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) {
    return 'U';
  }
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
};

export const Navbar = () => {
  const { data } = useCurrentUser();
  const logoutMutation = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const userName = data?.user?.name ?? 'User';
  const initials = getInitials(userName);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-surface-border bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E3FCF7] text-brand">
            <CheckSquare size={20} />
          </span>
          <span className="text-lg font-semibold text-ink-primary">Task Management</span>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full border border-surface-border bg-white px-2 py-1.5 pr-3 transition hover:bg-surface-page"
            aria-label="User menu"
            aria-haspopup="menu"
            aria-expanded={isOpen}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
              {initials}
            </span>
            <span className="hidden text-sm font-medium text-ink-primary sm:inline">{userName}</span>
          </button>
          {isOpen ? (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-surface-border bg-white shadow-lg"
            >
              <div className="border-b border-surface-border px-4 py-3">
                <p className="text-sm font-medium text-ink-primary">{userName}</p>
                <p className="mt-0.5 truncate text-xs text-ink-secondary">{data?.user?.email}</p>
              </div>
              <div className="p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  isLoading={logoutMutation.isPending}
                  onClick={() => logoutMutation.mutate()}
                  aria-label="Logout"
                >
                  Logout
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};
