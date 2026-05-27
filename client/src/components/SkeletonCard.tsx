export const SkeletonCard = () => {
  return (
    <div
      aria-hidden="true"
      className="animate-pulse rounded-2xl border border-surface-border bg-white p-4 shadow-sm"
    >
      <div className="h-5 w-2/3 rounded bg-[#F3F4F6]" />
      <div className="mt-3 h-4 w-full rounded bg-[#F3F4F6]" />
      <div className="mt-2 h-4 w-4/5 rounded bg-[#F3F4F6]" />
      <div className="mt-4 h-8 w-full rounded bg-[#F3F4F6]" />
    </div>
  );
};
