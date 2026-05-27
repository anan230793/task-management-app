import clsx from 'clsx';

interface BadgeProps {
  status: 'PENDING' | 'COMPLETED';
}

export const Badge = ({ status }: BadgeProps) => {
  const isCompleted = status === 'COMPLETED';

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
        isCompleted ? 'bg-[#E3FCF7] text-brand' : 'bg-[#FEF3C7] text-pending',
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
};
