import { CheckCircle2, ClipboardList, Clock } from 'lucide-react';
import { ReactNode } from 'react';

interface DashboardStatsProps {
  total: number;
  pending: number;
  completed: number;
  isLoading?: boolean;
}

interface StatCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  accentClass: string;
  iconBgClass: string;
  isLoading?: boolean;
}

const StatCard = ({ label, value, icon, accentClass, iconBgClass, isLoading }: StatCardProps) => (
  <div className="rounded-2xl border border-surface-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-ink-secondary">{label}</p>
        {isLoading ? (
          <div className="mt-2 h-9 w-12 animate-pulse rounded-lg bg-surface-page" />
        ) : (
          <p className={`mt-1 text-3xl font-bold ${accentClass}`}>{value}</p>
        )}
      </div>
      <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBgClass}`}>{icon}</span>
    </div>
  </div>
);

export const DashboardStats = ({ total, pending, completed, isLoading = false }: DashboardStatsProps) => (
  <div className="grid gap-4 sm:grid-cols-3">
    <StatCard
      label="Total Tasks"
      value={total}
      accentClass="text-brand"
      iconBgClass="bg-[#E3FCF7] text-brand"
      icon={<ClipboardList size={22} />}
      isLoading={isLoading}
    />
    <StatCard
      label="Pending"
      value={pending}
      accentClass="text-pending"
      iconBgClass="bg-[#FEF3C7] text-pending"
      icon={<Clock size={22} />}
      isLoading={isLoading}
    />
    <StatCard
      label="Completed"
      value={completed}
      accentClass="text-brand"
      iconBgClass="bg-[#E3FCF7] text-brand"
      icon={<CheckCircle2 size={22} />}
      isLoading={isLoading}
    />
  </div>
);
