'use client';

import { Fragment, useMemo } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { MessageCircle, Reply, ArrowUpRight, Sparkles } from 'lucide-react';
import { useDashboardStore } from '../../../lib/store';
import type { Platform, ScheduledPost } from '../../../lib/types';
import { PlatformIcon } from '../../../components/PlatformIcon';
import { EngagementTrend } from '../../../components/EngagementTrend';

const sampleMentions = [
  {
    id: 'm1',
    platform: 'instagram' as Platform,
    author: '@creativedose',
    message: 'Loved the carousel on storytelling hooks. Can you share the checklist template?',
    postedAt: new Date().toISOString(),
    sentiment: 'positive'
  },
  {
    id: 'm2',
    platform: 'facebook' as Platform,
    author: 'Sofia Ramirez',
    message: 'Replay request for the community-building workshop—link not working for LATAM region.',
    postedAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    sentiment: 'neutral'
  },
  {
    id: 'm3',
    platform: 'pinterest' as Platform,
    author: '@strategyroom',
    message: 'Repinned your launch playbook! Including it in this week’s inspo board.',
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    sentiment: 'positive'
  }
];

export default function EngagementPage() {
  const { scheduledPosts, engagementInsights } = useDashboardStore();

  const trendData = useMemo(() => buildTrend(scheduledPosts), [scheduledPosts]);
  const platformSummary = useMemo(() => summariseByPlatform(scheduledPosts), [scheduledPosts]);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
      <section className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Engagement performance</h2>
              <p className="text-sm text-slate-500">
                Measure reactions, comments, and shares across every channel in real time.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-600">
              <Sparkles className="h-4 w-4" />
              AI-assisted
            </span>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-100 bg-gradient-to-br from-white via-white to-primary-50/60 p-6">
            <EngagementTrend labels={trendData.labels} dataPoints={trendData.values} />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold text-slate-900">Channel breakdown</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {platformSummary.map((summary) => (
              <div key={summary.platform} className="rounded-2xl border border-slate-200 bg-white/70 p-4">
                <div className="flex items-center justify-between">
                  <PlatformIcon platform={summary.platform} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                    {summary.delta >= 0 ? '+' : ''}
                    {summary.delta}%
                  </span>
                </div>
                <p className="mt-4 text-2xl font-semibold text-slate-900">
                  {Intl.NumberFormat('en-US').format(summary.total)}
                </p>
                <p className="text-xs uppercase tracking-wider text-slate-400">Interactions (30d)</p>
                <p className="mt-3 text-sm text-slate-500">Top format: {summary.topFormat}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold text-slate-900">Mentions & inbox</h3>
          <p className="text-sm text-slate-500">Prioritised threads that need routing or fast replies.</p>
          <ul className="mt-4 space-y-3">
            {sampleMentions.map((mention) => (
              <li
                key={mention.id}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4"
              >
                <PlatformIcon platform={mention.platform} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{mention.author}</p>
                    <span className="text-xs text-slate-400">
                      {formatDistanceToNow(parseISO(mention.postedAt))} ago
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{mention.message}</p>
                  <div className="mt-3 flex gap-2 text-xs">
                    <button className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 font-semibold text-slate-600 hover:border-primary-200 hover:text-primary-600">
                      <Reply className="h-3 w-3" />
                      Reply
                    </button>
                    <button className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 font-semibold text-slate-600 hover:border-primary-200 hover:text-primary-600">
                      Assign teammate
                    </button>
                    <button className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 font-semibold text-slate-600 hover:border-primary-200 hover:text-primary-600">
                      Add to CRM
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <aside className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold text-slate-900">AI recommendations</h3>
          <ul className="mt-4 space-y-4 text-sm text-slate-600">
            {engagementInsights.map((insight) => (
              <li key={insight.id} className="rounded-2xl border border-slate-200 bg-white/70 p-4">
                <div className="flex items-center justify-between">
                  <PlatformIcon platform={insight.platform} />
                  <span
                    className={`text-xs font-semibold ${
                      insight.direction === 'up' ? 'text-emerald-500' : 'text-rose-500'
                    }`}
                  >
                    {insight.direction === 'up' ? '+' : ''}
                    {insight.change}%
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-900">{insight.metric}</p>
                <p className="mt-2 text-xs text-slate-500">{insight.recommendation}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-slate-200 shadow-soft">
          <h3 className="text-base font-semibold text-white">Top performing threads</h3>
          <div className="mt-4 space-y-3 text-sm">
            {trendData.hotPosts.map((post) => (
              <Fragment key={post.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <PlatformIcon platform={post.platform} />
                    <div>
                      <p className="text-sm font-semibold text-white/90">{post.topic}</p>
                      <p className="text-xs text-slate-300 flex items-center gap-1">
                        {post.analytics.comments} comments · {post.analytics.shares} shares
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold text-slate-900">Automations</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>• Auto-tag DMs asking for pricing → route to sales queue.</p>
            <p>• Create notion tasks when a comment includes “tutorial” or “how”.</p>
            <p>• Nudge Pinterest saves into weekly email roundup.</p>
          </div>
          <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-500 px-4 py-2 text-xs font-semibold text-white shadow-soft">
            <MessageCircle className="h-4 w-4" />
            Manage automations
          </button>
        </div>
      </aside>
    </div>
  );
}

function buildTrend(posts: ScheduledPost[]) {
  const sorted = [...posts].sort(
    (a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime()
  );
  const labels: string[] = [];
  const values: number[] = [];

  sorted.slice(0, 7).forEach((post) => {
    labels.push(formatDistanceToNow(parseISO(post.scheduledFor), { addSuffix: true }));
    const total =
      post.analytics.likes + post.analytics.comments + post.analytics.saves + post.analytics.shares;
    values.push(total);
  });

  const hotPosts = [...sorted]
    .sort((a, b) =>
      totalInteractions(b.analytics) === totalInteractions(a.analytics)
        ? 0
        : totalInteractions(b.analytics) - totalInteractions(a.analytics)
    )
    .slice(0, 3);

  if (!labels.length) {
    labels.push('Today', 'Tomorrow', 'Next week');
    values.push(10, 25, 18);
  }

  return { labels, values, hotPosts };
}

function summariseByPlatform(posts: ScheduledPost[]) {
  const summary = new Map<Platform, { total: number; formats: Map<ScheduledPost['mediaType'], number> }>();
  posts.forEach((post) => {
    const total = totalInteractions(post.analytics);
    const platformEntry = summary.get(post.platform) ?? {
      total: 0,
      formats: new Map<ScheduledPost['mediaType'], number>()
    };
    platformEntry.total += total;
    platformEntry.formats.set(
      post.mediaType,
      (platformEntry.formats.get(post.mediaType) ?? 0) + total
    );
    summary.set(post.platform, platformEntry);
  });

  return Array.from(summary.entries()).map(([platform, value]) => {
    const formats = Array.from(value.formats.entries()).sort((a, b) => b[1] - a[1]);
    const topFormat = formats[0]?.[0] ?? 'carousel';
    const delta = value.total > 0 ? Math.round((formats[0]?.[1] ?? 0) / value.total * 100) - 50 : 0;
    return {
      platform,
      total: Math.round(value.total),
      topFormat,
      delta
    };
  });
}

function totalInteractions(analytics: ScheduledPost['analytics']) {
  return analytics.likes + analytics.comments + analytics.saves + analytics.shares;
}
