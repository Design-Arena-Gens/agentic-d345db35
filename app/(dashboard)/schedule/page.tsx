'use client';

import { addDays, eachDayOfInterval, endOfWeek, format, parseISO, startOfWeek } from 'date-fns';
import { useMemo, useState } from 'react';
import { Clock4, CalendarPlus, CheckCircle2, Circle } from 'lucide-react';
import clsx from 'classnames';
import { useDashboardStore } from '../../../lib/store';
import type { ScheduledPost } from '../../../lib/types';
import { PlatformIcon } from '../../../components/PlatformIcon';

export default function SchedulePage() {
  const { scheduledPosts, accounts } = useDashboardStore();
  const [referenceDate, setReferenceDate] = useState(new Date());

  const weekRange = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(referenceDate, { weekStartsOn: 1 }),
        end: endOfWeek(referenceDate, { weekStartsOn: 1 })
      }),
    [referenceDate]
  );

  const postsByDay = useMemo(() => groupPostsByDay(scheduledPosts), [scheduledPosts]);
  const upcoming = useMemo(() => upcomingPosts(scheduledPosts).slice(0, 6), [scheduledPosts]);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.7fr_1fr]">
      <section className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Campaign calendar</h2>
              <p className="text-sm text-slate-500">
                Drag and drop upcoming posts into the perfect slot. Smart slots highlight peak engagement windows.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setReferenceDate(addDays(referenceDate, -7))}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-primary-200 hover:text-primary-600"
              >
                Previous week
              </button>
              <button
                onClick={() => setReferenceDate(addDays(referenceDate, 7))}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-primary-200 hover:text-primary-600"
              >
                Next week
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {weekRange.map((day) => {
              const iso = format(day, 'yyyy-MM-dd');
              const posts = postsByDay.get(iso) ?? [];
              return (
                <div key={iso} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {format(day, 'EEEE')}
                      </p>
                      <p className="text-lg font-semibold text-slate-900">{format(day, 'MMM d')}</p>
                    </div>
                    <span className="rounded-full bg-primary-50 px-3 py-1 text-[11px] font-semibold text-primary-600">
                      {posts.length} posts
                    </span>
                  </div>

                  <div className="space-y-3">
                    {posts.map((post) => (
                      <div key={post.id} className="rounded-xl border border-slate-200 bg-white px-3 py-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <PlatformIcon platform={post.platform} />
                            <p className="text-xs font-semibold text-slate-900 line-clamp-3">
                              {post.topic}
                            </p>
                          </div>
                          <span className="text-[11px] uppercase tracking-widest text-slate-400">
                            {format(parseISO(post.scheduledFor), 'HH:mm')}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-slate-500 line-clamp-3">{post.caption}</p>
                      </div>
                    ))}
                    {posts.length === 0 && (
                      <p className="rounded-xl border border-dashed border-slate-200 p-4 text-xs text-slate-400">
                        No posts yet. Drop one here to keep cadence.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold text-slate-900">Team assignments</h3>
          <p className="text-sm text-slate-500">Keep designers, writers, and strategists aligned with sprint planning.</p>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {['Creative', 'Copy', 'Strategist'].map((team) => (
              <div key={team} className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-slate-100 p-4">
                <p className="text-sm font-semibold text-slate-900">{team} pod</p>
                <p className="mt-1 text-xs text-slate-500">2 tasks pending · 4 scheduled posts</p>
                <button className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-primary-200 hover:text-primary-600">
                  View briefs
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <aside className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold text-slate-900">Upcoming queue</h3>
          <ul className="mt-4 space-y-3">
            {upcoming.map((post) => {
              const account = accounts.find((acc) => acc.id === post.accountId);
              return (
                <li
                  key={post.id}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4"
                >
                  <PlatformIcon platform={post.platform} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">{post.topic}</p>
                    <p className="text-xs text-slate-500">
                      {account?.handle ?? 'Unassigned'} · {format(parseISO(post.scheduledFor), 'MMM d, h:mm a')}
                    </p>
                    <p className="mt-2 text-xs text-slate-500 line-clamp-3">{post.caption}</p>
                  </div>
                </li>
              );
            })}
            {upcoming.length === 0 && (
              <li className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
                Schedule posts to see the queue overview here.
              </li>
            )}
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-slate-200 shadow-sm">
          <h3 className="text-base font-semibold text-white">Smart slot finder</h3>
          <p className="mt-2 text-sm text-slate-300">
            AI analyses performance curves per platform and suggests slots that maximise conversions.
          </p>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              Instagram · Tuesdays 11:30 AM → +28% saves
            </div>
            <div className="flex items-center gap-2 text-sky-300">
              <CheckCircle2 className="h-4 w-4" />
              Facebook · Thursdays 2:00 PM → +17% CTR
            </div>
            <div className="flex items-center gap-2 text-rose-300">
              <CheckCircle2 className="h-4 w-4" />
              Pinterest · Saturdays 9:00 AM → +34% outbound
            </div>
          </div>
          <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary-500 px-4 py-2 text-xs font-semibold text-white shadow-soft">
            <CalendarPlus className="h-4 w-4" />
            Apply to queue
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold text-slate-900">Status breakdown</h3>
          <ul className="mt-3 space-y-3 text-sm text-slate-600">
            {statusSummary(scheduledPosts).map((item) => (
              <li key={item.status} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/70 px-4 py-3">
                <div className="flex items-center gap-2">
                  {item.status === 'scheduled' ? (
                    <Clock4 className="h-4 w-4 text-primary-500" />
                  ) : item.status === 'posted' ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Circle className="h-4 w-4 text-slate-400" />
                  )}
                  <span className="capitalize">{item.status}</span>
                </div>
                <span className="font-semibold">{item.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

function groupPostsByDay(posts: ScheduledPost[]): Map<string, ScheduledPost[]> {
  return posts.reduce((acc, post) => {
    const key = format(parseISO(post.scheduledFor), 'yyyy-MM-dd');
    const existing = acc.get(key) ?? [];
    existing.push(post);
    acc.set(key, existing);
    return acc;
  }, new Map<string, ScheduledPost[]>());
}

function upcomingPosts(posts: ScheduledPost[]): ScheduledPost[] {
  return [...posts]
    .filter((post) => post.status !== 'draft')
    .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime());
}

function statusSummary(posts: ScheduledPost[]) {
  const summary = new Map<ScheduledPost['status'], number>();
  posts.forEach((post) => {
    summary.set(post.status, (summary.get(post.status) ?? 0) + 1);
  });
  return Array.from(summary.entries()).map(([status, count]) => ({ status, count }));
}
