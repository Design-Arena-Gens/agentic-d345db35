'use client';

import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

export function Topbar() {
  const [query, setQuery] = useState('');

  return (
    <header className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/70 px-6 py-5 backdrop-blur-lg sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-500">Mission Control</p>
        <h1 className="text-2xl font-semibold text-slate-900">Plan, launch, and track social campaigns</h1>
        <p className="text-sm text-slate-500">
          Generate on-brand copy, schedule posts, and reply to engagement across every channel.
        </p>
      </div>

      <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search pages, assets, or teammates"
          className="flex-1 border-none bg-transparent text-sm text-slate-700 outline-none"
        />
        <button className="inline-flex items-center gap-1 rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white shadow-soft">
          <Sparkles className="h-3 w-3" />
          Magic Prompt
        </button>
      </div>
    </header>
  );
}
