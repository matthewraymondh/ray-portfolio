import { useEffect, useState } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { Icon } from "@iconify/react/dist/iconify.js";

const username = "matthewraymondh";
const contributionChartUrl = `https://ghchart.rshah.org/cfa355/${username}`;

const GithubPulse = () => {
  const [profileStats, setProfileStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${username}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
            },
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`GitHub responded with ${response.status}`);
        }

        const data = await response.json();
        if (isMounted) {
          setProfileStats({
            repos: data.public_repos,
            followers: data.followers,
            gists: data.public_gists,
            avatar: data.avatar_url,
            profileUrl: data.html_url,
          });
          setError(null);
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        if (isMounted) {
          setError("Unable to reach GitHub right now.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const text =
    "A live glimpse at the commits, repos, and experiments powering everything from GenAI assistants to Flutter apps.";

  const StatBlock = ({ icon, label, value }) => (
    <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-black/[0.04] px-5 py-4 shadow-[0_16px_40px_-28px_rgba(0,0,0,0.6)]">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-black/70 to-black text-white">
        <Icon icon={icon} className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="flex flex-col">
        <span className="text-xs uppercase tracking-[0.35em] text-black/45">
          {label}
        </span>
        <span className="text-xl font-semibold text-black">{value}</span>
      </div>
    </div>
  );

  return (
    <section id="pulse" className="relative flex flex-col py-24 md:py-32">
      <AnimatedHeaderSection
        subTitle={"Always shipping"}
        title={"GitHub Pulse"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      <div className="content-container">
        <div className="grid gap-10 rounded-[32px] border border-black/10 bg-white/85 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.8fr)] lg:p-12 backdrop-blur-2xl shadow-[0_40px_90px_-60px_rgba(0,0,0,0.75)]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="hidden h-16 w-16 overflow-hidden rounded-full border border-black/10 bg-black/5 sm:flex">
                  {profileStats?.avatar ? (
                    <img
                      src={profileStats.avatar}
                      alt="GitHub avatar"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm uppercase tracking-[0.35em] text-black/40">
                      GH
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs uppercase tracking-[0.35em] text-black/45">
                    {`@${username}`}
                  </p>
                  <a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-lg font-medium text-black transition-colors duration-300 hover:text-[#cfa355]"
                  >
                    View GitHub Profile
                    <Icon icon="lucide:arrow-up-right" className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-black/70">
                From enterprise GenAI copilots to indie experiments, my repos
                capture a steady rhythm of production-grade shipping and R&D
                tinkering.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {profileStats && !isLoading ? (
                <>
                  <StatBlock
                    icon="lucide:folder-open"
                    label="Public repos"
                    value={profileStats.repos}
                  />
                  <StatBlock
                    icon="lucide:users"
                    label="Followers"
                    value={profileStats.followers}
                  />
                  <StatBlock
                    icon="lucide:braces"
                    label="Public gists"
                    value={profileStats.gists}
                  />
                  <StatBlock
                    icon="lucide:rocket"
                    label="Latest update"
                    value={new Date().toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  />
                </>
              ) : isLoading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={`gh-stat-skeleton-${idx}`}
                    className="h-[86px] animate-pulse rounded-2xl border border-black/10 bg-black/5"
                  />
                ))
              ) : (
                <div className="col-span-full rounded-2xl border border-black/10 bg-black/5 px-5 py-4 text-sm text-black/60">
                  {error || "GitHub data unavailable right now."}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-black/45">
              <span className="h-px w-10 bg-black/15" aria-hidden="true" />
              <span>Real-time contributions</span>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-black/[0.04] p-4 shadow-[0_24px_60px_-44px_rgba(0,0,0,0.7)]">
              <img
                src={contributionChartUrl}
                alt={`GitHub contribution chart for ${username}`}
                className="w-full"
                loading="lazy"
              />
              <span className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10 mix-blend-soft-light" />
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-black/40">
              Updated nightly • Powered by GitHub API
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubPulse;
