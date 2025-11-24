'use client';

import { useEffect, useMemo, useState } from 'react';
import { formatISO, parseISO } from 'date-fns';
import { Sparkles, Hash, Clock, Send } from 'lucide-react';
import clsx from 'classnames';
import { useDashboardStore } from '../../../lib/store';
import type { Platform } from '../../../lib/types';

const moods: Array<{ id: 'inspirational' | 'educational' | 'promotional'; label: string; description: string }> = [
  {
    id: 'inspirational',
    label: 'Inspire',
    description: 'Motivate your audience to dream bigger and take action.'
  },
  {
    id: 'educational',
    label: 'Educate',
    description: 'Teach frameworks, tactics, and step-by-step playbooks.'
  },
  {
    id: 'promotional',
    label: 'Promote',
    description: 'Highlight launches, offers, and conversion-focused campaigns.'
  }
];

export default function ContentStudioPage() {
  const [category, setCategory] = useState('Marketing Growth');
  const [topic, setTopic] = useState('Storytelling hook framework');
  const [mood, setMood] = useState<typeof moods[number]['id']>('educational');
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('instagram');
  const [scheduledDate, setScheduledDate] = useState(() => formatISO(new Date()).slice(0, 16));
  const [selectedAccount, setSelectedAccount] = useState<string>('');

  const { accounts, categoryTemplates, postIdeas, pushPostIdea, schedulePost } = useDashboardStore();

  const activeIdea = useMemo(
    () => postIdeas.find((idea) => idea.id === selectedIdeaId) ?? postIdeas[0],
    [postIdeas, selectedIdeaId]
  );

  const selectedCategoryTemplate = categoryTemplates.find((template) => template.title === category);

  const hashtags = useMemo(() => {
    if (!activeIdea) return [];
    return activeIdea.hashtags;
  }, [activeIdea]);

  const actionableAccounts = accounts.filter((account) => account.status === 'connected');

  useEffect(() => {
    if (!selectedAccount && actionableAccounts.length) {
      setSelectedAccount(actionableAccounts[0].id);
    }
  }, [actionableAccounts, selectedAccount]);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">AI Content Generator</h2>
              <p className="text-sm text-slate-500">
                Generate platform-ready copy, hooks, and hashtags aligned with your brand voice.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-600">
              <Sparkles className="h-4 w-4" />
              Agent mode
            </span>
          </div>

          <form
            className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              const idea = pushPostIdea({ category, topic, mood });
              setSelectedIdeaId(idea.id);
              setSelectedPlatform(idea.platforms[0]);
            }}
          >
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Campaign category</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-primary-400 focus:outline-none"
              >
                {categoryTemplates.map((template) => (
                  <option key={template.id} value={template.title}>
                    {template.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Topic or CTA</span>
              <input
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                placeholder="New feature launch teaser"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-primary-400 focus:outline-none"
              />
            </label>

            <div className="md:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Brand mood</span>
              <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-3">
                {moods.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setMood(option.id)}
                    className={clsx(
                      'flex flex-col gap-1 rounded-2xl border px-4 py-3 text-left text-sm transition',
                      mood === option.id
                        ? 'border-primary-400 bg-primary-50 text-primary-700 shadow-soft'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-primary-200'
                    )}
                  >
                    <span className="font-semibold">{option.label}</span>
                    <span className="text-xs text-slate-500">{option.description}</span>
                  </button>
                ))}
              </div>
              {selectedCategoryTemplate && (
                <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 px-4 py-3 text-xs text-slate-500">
                  <p className="font-semibold text-slate-600">Suggested topics</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedCategoryTemplate.exampleTopics.map((example) => (
                      <button
                        key={example}
                        type="button"
                        onClick={() => setTopic(example)}
                        className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-slate-600 shadow-sm"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-soft"
            >
              <Sparkles className="h-4 w-4" />
              Generate post idea
            </button>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold text-slate-900">Generated ideas</h3>
          <p className="text-sm text-slate-500">Select an idea to schedule and customize per platform.</p>

          <div className="mt-6 space-y-4">
            {postIdeas.map((idea) => (
              <button
                key={idea.id}
                onClick={() => {
                  setSelectedIdeaId(idea.id);
                  setSelectedPlatform(idea.platforms[0]);
                }}
                className={clsx(
                  'w-full rounded-2xl border px-5 py-4 text-left transition',
                  activeIdea?.id === idea.id
                    ? 'border-primary-400 bg-primary-50/70 text-primary-700 shadow-soft'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:bg-primary-50/40'
                )}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">{idea.topic}</p>
                  <span className="text-[11px] uppercase tracking-wider text-primary-500">
                    {idea.recommendedMedia}
                  </span>
                </div>
                <p className="mt-2 text-xs text-primary-600">{idea.hook}</p>
                <p className="mt-2 text-sm text-slate-600 line-clamp-3">{idea.caption}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                  {idea.platforms.map((platform) => (
                    <span key={platform} className="rounded-full bg-white px-2 py-1 font-semibold uppercase tracking-wide text-[10px]">
                      {platform}
                    </span>
                  ))}
                </div>
              </button>
            ))}
            {postIdeas.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
                Generate your first idea to see AI-assisted copy, hashtags, and best-fit media suggestions.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold text-slate-900">Cross-channel preview</h3>
          <p className="text-sm text-slate-500">Customize the caption, pick the channel, and slot in the send time.</p>

          {activeIdea ? (
            <div className="mt-5 space-y-5">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Select account</span>
                <select
                  value={selectedAccount}
                  onChange={(event) => setSelectedAccount(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-primary-400 focus:outline-none"
                >
                  <option value="">Choose a connected account</option>
                  {actionableAccounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.handle} · {account.platform}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {(['instagram', 'facebook', 'pinterest'] as Platform[]).map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className={clsx(
                      'flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition',
                      selectedPlatform === platform
                        ? 'border-primary-400 bg-primary-50 text-primary-700 shadow-soft'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-primary-200'
                    )}
                  >
                    <span className="font-semibold capitalize">{platform}</span>
                    <span className="text-[11px] uppercase tracking-widest text-slate-400">
                      {selectedPlatform === platform ? 'selected' : 'select'}
                    </span>
                  </button>
                ))}
              </div>

              <label className="flex flex-col gap-2 text-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Suggested caption
                </span>
                <textarea
                  rows={6}
                  value={activeIdea.caption}
                  readOnly
                  className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-primary-400 focus:outline-none"
                />
              </label>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Viral hashtags</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {hashtags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
                      <Hash className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Scheduled send
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <input
                      type="datetime-local"
                      value={scheduledDate}
                      onChange={(event) => setScheduledDate(event.target.value)}
                      className="flex-1 border-none bg-transparent text-sm text-slate-700 outline-none"
                    />
                  </div>
                </label>

                <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                  <p className="font-semibold text-slate-700">Smart slot tip</p>
                  <p>
                    {selectedPlatform === 'instagram'
                      ? 'Highest saves happen Tuesdays at 11:30 AM. Bundle Stories + Carousel.'
                      : selectedPlatform === 'facebook'
                      ? 'Boost CTR with mid-copy links. Optimal slot: Thursdays at 2:00 PM.'
                      : 'Idea pins with vertical carousels pop on Saturdays at 9:00 AM.'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (!selectedAccount) return;
                  schedulePost({
                    accountId: selectedAccount,
                    platform: selectedPlatform,
                    category,
                    topic: activeIdea.topic,
                    caption: activeIdea.caption,
                    hashtags: activeIdea.hashtags,
                    mediaType: activeIdea.recommendedMedia,
                    scheduledFor: scheduledDate
                      ? parseISO(scheduledDate).toISOString()
                      : new Date().toISOString()
                  });
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-soft"
              >
                <Send className="h-4 w-4" />
                Schedule for {selectedPlatform}
              </button>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
              Generate an idea to unlock the preview workspace.
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 p-6 text-white shadow-sm">
          <h3 className="text-base font-semibold">Engagement recipe</h3>
          <p className="mt-2 text-sm text-primary-100">
            Stack AI-driven hooks, hashtag clusters, and cross-posting cues to maximise reach.
          </p>
          <ul className="mt-4 space-y-3 text-sm text-primary-100">
            <li>· Use a story-driven hook in line one, CTA in line five.</li>
            <li>· Pin comments with lead magnets for Facebook conversions.</li>
            <li>· Remix top Instagram reels into Pinterest idea pins weekly.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
