import { useEffect, useMemo, useState } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { Icon } from "@iconify/react/dist/iconify.js";
import { newsletterConfig } from "../constants";

const formatDate = (value) => {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const derivePostsFromFeed = (feedData) => {
  if (!feedData) return [];
  if (Array.isArray(feedData.items)) {
    return feedData.items.slice(0, 4).map((item, index) => ({
      id: item.guid || item.id || `feed-item-${index}`,
      title: item.title,
      summary:
        item.description?.replace(/<[^>]+>/g, "")?.slice(0, 220).trim() +
          (item.description?.length > 220 ? "…" : "") ||
        item.contentSnippet ||
        "",
      url: item.link,
      publishedAt: item.pubDate || item.published,
      stats: item.engagement || null,
    }));
  }
  if (Array.isArray(feedData.posts)) {
    return feedData.posts.slice(0, 4).map((post) => ({
      id: post.id,
      title: post.title,
      summary:
        post.subtitle?.slice(0, 220).trim() +
          (post.subtitle?.length > 220 ? "…" : "") ||
        post.summary ||
        "",
      url: post.canonical_url || post.url,
      publishedAt: post.published_at,
      stats: {
        reactions: post.interactions?.total,
        comments: post.comments_count,
      },
    }));
  }
  return [];
};

const NewsletterSpotlight = () => {
  const [posts, setPosts] = useState(newsletterConfig.fallbackPosts);
  const [isLoading, setIsLoading] = useState(Boolean(newsletterConfig.feedUrl));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!newsletterConfig.feedUrl) return;

    const controller = new AbortController();

    const hydrate = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(newsletterConfig.feedUrl, {
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Feed responded with ${response.status}`);
        }

        const data = await response.json();
        const derived = derivePostsFromFeed(data);

        if (derived.length) {
          setPosts(derived);
          setError(null);
        } else {
          setError("Feed returned no posts; showing highlights instead.");
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        setError("Unable to fetch live newsletter data right now.");
      } finally {
        setIsLoading(false);
      }
    };

    hydrate();

    return () => controller.abort();
  }, []);

  const primaryPost = useMemo(() => posts[0], [posts]);
  const secondaryPosts = useMemo(() => posts.slice(1, 4), [posts]);

  const text =
    "A rolling digest of GenAI delivery lessons, architecture breakdowns, and experiments shipped from the lab to production.";

  return (
    <section id="newsletter" className="relative flex flex-col py-24 md:py-32">
      <AnimatedHeaderSection
        subTitle={"Field notes & dispatches"}
        title={`${newsletterConfig.platform}`}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      <div className="content-container">
        <div className="grid gap-8 rounded-[32px] border border-black/10 bg-white/85 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)] lg:p-12 backdrop-blur-2xl shadow-[0_40px_90px_-60px_rgba(0,0,0,0.75)]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-black/45">
                <span className="h-px w-10 bg-black/15" aria-hidden="true" />
                <span>{newsletterConfig.name}</span>
                <span className="hidden h-px w-10 bg-black/15 sm:inline" aria-hidden="true" />
                <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.05] px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-black/60">
                  <Icon icon="lucide:users" className="h-3.5 w-3.5" />
                  {newsletterConfig.subscriberCount.toLocaleString()} subscribers
                </span>
              </div>
              <p className="text-sm uppercase tracking-[0.35em] text-black/40">
                {newsletterConfig.avgEngagement}
              </p>
            </div>
            <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-black/[0.04] p-6 shadow-[0_24px_60px_-44px_rgba(0,0,0,0.7)]">
              <span className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/15 mix-blend-soft-light" />
              {primaryPost ? (
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-black/40">
                    <Icon icon="lucide:radar" className="h-4 w-4" aria-hidden="true" />
                    <span>Featured dispatch</span>
                    {primaryPost.publishedAt && (
                      <span className="text-black/25">· {formatDate(primaryPost.publishedAt)}</span>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-black">
                    {primaryPost.title}
                  </h3>
                  <p className="text-base leading-relaxed text-black/70">
                    {primaryPost.summary}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.35em] text-black/45">
                    {primaryPost.stats?.reactions && (
                      <span className="inline-flex items-center gap-2">
                        <Icon icon="lucide:sparkles" className="h-4 w-4 text-[#cfa355]" />
                        {primaryPost.stats.reactions.toLocaleString()} reactions
                      </span>
                    )}
                    {primaryPost.stats?.comments && (
                      <span className="inline-flex items-center gap-2">
                        <Icon icon="lucide:message-circle" className="h-4 w-4 text-[#cfa355]" />
                        {primaryPost.stats.comments.toLocaleString()} comments
                      </span>
                    )}
                    <a
                      href={primaryPost.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-[0.65rem] font-medium tracking-[0.35em] text-black transition-colors duration-300 hover:bg-black hover:text-white"
                    >
                      Read post
                      <Icon icon="lucide:arrow-up-right" className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="h-64 animate-pulse rounded-[24px] bg-black/10" />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-black/45">
              <span className="h-px w-10 bg-black/15" aria-hidden="true" />
              <span>Recent drops</span>
              {isLoading && <span className="animate-pulse text-black/30">Fetching…</span>}
            </div>
            {error && (
              <div className="rounded-3xl border border-black/10 bg-black/5 px-5 py-4 text-xs uppercase tracking-[0.35em] text-black/45">
                {error}
              </div>
            )}
            <div className="grid gap-4">
              {secondaryPosts.map((post) => (
                <article
                  key={post.id}
                  className="group relative overflow-hidden rounded-[24px] border border-black/10 bg-white/90 p-5 shadow-[0_20px_60px_-48px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/15 opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-60" />
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.35em] text-black/40">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span className="h-px w-6 bg-black/15" aria-hidden="true" />
                      {post.stats?.reactions && (
                        <span className="inline-flex items-center gap-1">
                          <Icon icon="lucide:fire" className="h-3.5 w-3.5 text-[#cfa355]" />
                          {post.stats.reactions.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-semibold text-black">
                      {post.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-black/65">
                      {post.summary}
                    </p>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-black/50 transition-colors duration-300 hover:text-black"
                    >
                      Read more
                      <Icon icon="lucide:arrow-up-right" className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </article>
              ))}
              {!secondaryPosts.length && !isLoading && (
                <div className="rounded-3xl border border-black/10 bg-black/5 px-5 py-4 text-xs uppercase tracking-[0.35em] text-black/45">
                  No additional posts yet—stay tuned.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSpotlight;
