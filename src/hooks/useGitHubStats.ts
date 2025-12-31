"use client";

import { useState, useEffect } from "react";

interface GitHubStats {
  totalContributions: number;
  publicRepos: number;
  followers: number;
  loading: boolean;
  error: boolean;
}

interface CachedData {
  stats: Omit<GitHubStats, "loading" | "error">;
  timestamp: number;
}

const CACHE_KEY = "github_stats";
const CACHE_TTL = 1000 * 60 * 60; // 1시간

function getCache(): CachedData | null {
  if (typeof window === "undefined") return null;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const data: CachedData = JSON.parse(cached);
    const isExpired = Date.now() - data.timestamp > CACHE_TTL;

    return isExpired ? null : data;
  } catch {
    return null;
  }
}

function setCache(stats: Omit<GitHubStats, "loading" | "error">) {
  if (typeof window === "undefined") return;

  const data: CachedData = {
    stats,
    timestamp: Date.now(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
}

export function useGitHubStats(username: string): GitHubStats {
  const [stats, setStats] = useState<GitHubStats>({
    totalContributions: 0,
    publicRepos: 0,
    followers: 0,
    loading: true,
    error: false,
  });

  useEffect(() => {
    // 캐시 확인
    const cached = getCache();
    if (cached) {
      setStats({
        ...cached.stats,
        loading: false,
        error: false,
      });
      return;
    }

    async function fetchStats() {
      try {
        // GitHub User API
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const userData = await userRes.json();

        // Contributions API (unofficial but reliable)
        const contribRes = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );

        let totalContributions = 0;
        if (contribRes.ok) {
          const contribData = await contribRes.json();
          totalContributions = contribData.total?.lastYear || 0;
        }

        const newStats = {
          totalContributions,
          publicRepos: userData.public_repos || 0,
          followers: userData.followers || 0,
        };

        // 캐시 저장
        setCache(newStats);

        setStats({
          ...newStats,
          loading: false,
          error: false,
        });
      } catch (error) {
        console.error("GitHub API error:", error);
        setStats((prev) => ({ ...prev, loading: false, error: true }));
      }
    }

    fetchStats();
  }, [username]);

  return stats;
}
