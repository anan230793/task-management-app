import { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  subtitle: string;
  action?: ReactNode;
}

export const EmptyState = ({ title, subtitle, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-surface-border bg-white px-6 py-12 text-center shadow-sm">
      <svg className="mb-4 h-20 w-20 text-brand" viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <rect x="28" y="20" width="64" height="80" rx="10" stroke="currentColor" strokeWidth="6" />
        <path d="M44 45h32M44 60h20" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <path
          d="m46 78 8 8 18-18"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h3 className="text-lg font-semibold text-ink-primary">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-ink-secondary">{subtitle}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
};
