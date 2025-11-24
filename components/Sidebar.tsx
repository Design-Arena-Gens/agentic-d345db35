'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, CalendarClock, GalleryHorizontalEnd, MessageSquare } from 'lucide-react';
import clsx from 'classnames';

const navigation = [
  { name: 'Overview', href: '/', icon: BarChart3 },
  { name: 'Content Studio', href: '/content', icon: GalleryHorizontalEnd },
  { name: 'Schedule', href: '/schedule', icon: CalendarClock },
  { name: 'Engagement', href: '/engagement', icon: MessageSquare }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white/60 px-6 py-8 shadow-sm backdrop-blur-lg lg:flex">
      <div className="flex items-center gap-2 text-xl font-semibold text-slate-900">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-600 text-white shadow-soft">
          <span className="text-2xl">∞</span>
        </div>
        Agentic Social
      </div>

      <nav className="mt-10 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition',
                isActive
                  ? 'bg-primary-50 text-primary-700 shadow-soft'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              <span
                className={clsx(
                  'grid h-9 w-9 place-items-center rounded-lg border text-sm transition',
                  isActive
                    ? 'border-primary-100 bg-primary-100 text-primary-600'
                    : 'border-slate-200 bg-white text-slate-500 group-hover:border-slate-300 group-hover:text-slate-900'
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-primary-100 bg-primary-50 p-4 text-sm text-primary-800">
        <p className="font-semibold">AI auto-scheduler</p>
        <p className="mt-1 text-primary-700/80">
          Let Agentic find the best publishing slots for campaigns based on your engagement curve.
        </p>
        <button className="mt-4 inline-flex items-center justify-center rounded-full bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-soft">
          Activate Smart Slots
        </button>
      </div>
    </aside>
  );
}
