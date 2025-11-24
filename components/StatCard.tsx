interface StatCardProps {
  title: string;
  value: string;
  delta?: {
    change: number;
    label: string;
  };
  accent?: 'blue' | 'purple' | 'amber';
}

const accentMap: Record<NonNullable<StatCardProps['accent']>, string> = {
  blue: 'from-sky-500 via-sky-400 to-sky-600',
  purple: 'from-primary-500 via-primary-400 to-primary-600',
  amber: 'from-amber-500 via-amber-400 to-amber-600'
};

export function StatCard({ title, value, delta, accent = 'purple' }: StatCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
      <div className="flex items-center gap-3">
        <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-semibold uppercase text-white ${accentMap[accent]}`}>
          {title
            .split(' ')
            .map((word) => word[0] ?? '')
            .join('')
            .slice(0, 2)}
        </span>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{title}</p>
          <p className="text-2xl font-semibold text-slate-900">{value}</p>
        </div>
      </div>
      {delta && (
        <p className="text-xs font-medium text-slate-500">
          <span className={`mr-2 font-semibold ${delta.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {delta.change >= 0 ? '+' : ''}
            {delta.change}%
          </span>
          {delta.label}
        </p>
      )}
    </div>
  );
}
