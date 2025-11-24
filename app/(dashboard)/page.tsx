'use client';

import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { ArrowUpRight, Clock4, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PlatformIcon } from '../../components/PlatformIcon';
import { StatCard } from '../../components/StatCard';
import { useDashboardStore } from '../../lib/store';
import type { ScheduledPost } from '../../lib/types';

export default function OverviewPage() {
  const { accounts, scheduledPosts, postIdeas, engagementInsights, autoPopulatePipeline } =
    useDashboardStore();

  const upcomingPosts = upcomingPipeline(scheduledPosts).slice(0, 4);

  const totalScheduled = scheduledPosts.filter((post) => post.status === 'scheduled').length;
  const totalPublished = scheduledPosts.filter((post) => post.status === 'posted').length;
  const totalAccounts = accounts.length;

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <section className="xl:col-span-3 grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard
          title="Scheduled Posts"
          value={`${totalScheduled}`}
          delta={{ change: 18, label: 'vs. last sprint' }}
          accent="purple"
        />
        <StatCard
          title="Accounts Connected"
          value={`${totalAccounts}`}
          delta={{ change: 6, label: 'avg. response time decrease' }}
          accent="blue"
        />
        <StatCard
          title="Published (30d)"
          value={`${totalPublished}`}
          delta={{ change: 12, label: 'multi-platform delivery' }}
          accent="amber"
        />
      </section>

      <section className="xl:col-span-2 space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Upcoming schedule</h2>
              <p className="text-sm text-slate-500">
                Auto-generated captions, hashtag bundles, and optimal posting windows for every channel.
              </p>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-soft"
              onClick={() => autoPopulatePipeline('instagram')}
            >
              <Sparkles className="h-4 w-4" />
              Auto-fill ideas
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {upcomingPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/70 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <PlatformIcon platform={post.platform} />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{post.topic}</p>
                      <p className="text-xs text-slate-500">
                        {format(parseISO(post.scheduledFor), 'MMM d, h:mm a')}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-600">
                    {post.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-3">{post.caption}</p>
                <div className="flex flex-wrap gap-2">
                  {post.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <h2 className="text-lg font-semibold text-slate-900">AI content pipeline</h2>
          <p className="text-sm text-slate-500">
            Latest ideas based on your categories, trending hashtags, and platform sentiment.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {postIdeas.slice(0, 4).map((idea) => (
              <div key={idea.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-primary-50/60 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">{idea.topic}</p>
                  <span className="text-[11px] uppercase tracking-wider text-primary-500">{idea.recommendedMedia}</span>
                </div>
                <p className="text-xs font-medium text-primary-600">{idea.hook}</p>
                <p className="text-sm text-slate-600 line-clamp-3">{idea.caption}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  {idea.platforms.map((platform) => (
                    <span key={platform} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {postIdeas.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
                No ideas generated yet. Use the Content Studio to draft viral-ready posts in seconds.
              </div>
            )}
          </div>

          <Link
            href="/content"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-600"
          >
            Go to Content Studio
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <h2 className="text-lg font-semibold text-slate-900">Connected accounts</h2>
          <ul className="mt-4 space-y-4">
            {accounts.map((account) => (
              <li key={account.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/70 p-4">
                <div className="flex items-center gap-3">
                  <PlatformIcon platform={account.platform} />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{account.handle}</p>
                    <p className="text-xs text-slate-500">
                      Connected {formatDistanceToNow(parseISO(account.connectedAt))} ago · {account.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">
                    {Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(account.followers)}
                  </p>
                  <p className="text-xs text-emerald-500">↑ {account.growthRate}% growth</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <h2 className="text-lg font-semibold text-slate-900">Engagement pulse</h2>
          <p className="text-sm text-slate-500">Key signals across channels with AI generated recommendations.</p>
          <div className="mt-5 space-y-4">
            {engagementInsights.map((insight) => (
              <div key={insight.id} className="flex items-start justify-between rounded-2xl border border-slate-200 bg-white/70 p-4">
                <div className="flex gap-3">
                  <PlatformIcon platform={insight.platform} />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{insight.metric}</p>
                    <p className="text-xs text-slate-500">{insight.recommendation}</p>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold ${
                    insight.direction === 'up' ? 'text-emerald-500' : 'text-rose-500'
                  }`}
                >
                  {insight.direction === 'up' ? '+' : ''}
                  {insight.change}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-dashed border-primary-200 bg-primary-50/60 p-6 text-sm text-primary-700">
          <h3 className="text-base font-semibold text-primary-700">Campaign assistant</h3>
          <p className="mt-2">
            Sync feedback from Instagram DMs, Facebook inbox, and Pinterest comments into a unified inbox. Automations route priority replies to the right teammate.
          </p>
        </div>
      </section>
    </div>
  );
}

function upcomingPipeline(posts: ScheduledPost[]) {
  return [...posts].sort(
    (a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime()
  );
}
