import type { ReactNode } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Topbar } from '../../components/Topbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 px-4 pb-12 pt-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <Topbar />
          {children}
        </div>
      </main>
    </div>
  );
}
