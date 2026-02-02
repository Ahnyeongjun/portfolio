"use client";

import { useState, useEffect } from "react";

export interface BOJStats {
  handle: string;
  tier: number;
  rating: number;
  solvedCount: number;
  rank: number;
  maxStreak: number;
  loading: boolean;
  error: boolean;
}

interface CachedData {
  stats: Omit<BOJStats, "loading" | "error">;
  timestamp: number;
}

const CACHE_KEY = "boj_stats";
const CACHE_TTL = 1000 * 60 * 60; // 1시간

// 티어 번호를 텍스트로 변환 (1~30)
export function getTierName(tier: number): string {
  const tiers = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Ruby"];
  const levels = ["V", "IV", "III", "II", "I"];

  if (tier === 0) return "Unrated";
  if (tier === 31) return "Master";

  const tierIndex = Math.floor((tier - 1) / 5);
  const levelIndex = (tier - 1) % 5;

  return `${tiers[tierIndex]} ${levels[levelIndex]}`;
}

// 티어 색상 반환
export function getTierColor(tier: number): string {
  if (tier === 0) return "#2d2d2d";
  if (tier <= 5) return "#ad5600"; // Bronze
  if (tier <= 10) return "#435f7a"; // Silver
  if (tier <= 15) return "#ec9a00"; // Gold
  if (tier <= 20) return "#27e2a4"; // Platinum
  if (tier <= 25) return "#00b4fc"; // Diamond
  if (tier <= 30) return "#ff0062"; // Ruby
  return "#b300e0"; // Master
}

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

function setCache(stats: Omit<BOJStats, "loading" | "error">) {
  if (typeof window === "undefined") return;

  const data: CachedData = {
    stats,
    timestamp: Date.now(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
}

export function useBOJStats(handle: string): BOJStats {
  const [stats, setStats] = useState<BOJStats>({
    handle: "",
    tier: 0,
    rating: 0,
    solvedCount: 0,
    rank: 0,
    maxStreak: 0,
    loading: true,
    error: false,
  });

  useEffect(() => {
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
        const res = await fetch(`/api/boj?handle=${handle}`);
        if (!res.ok) throw new Error("Failed to fetch BOJ stats");

        const data = await res.json();

        const newStats = {
          handle: data.handle,
          tier: data.tier || 0,
          rating: data.rating || 0,
          solvedCount: data.solvedCount || 0,
          rank: data.rank || 0,
          maxStreak: data.maxStreak || 0,
        };

        setCache(newStats);

        setStats({
          ...newStats,
          loading: false,
          error: false,
        });
      } catch (error) {
        console.error("solved.ac API error:", error);
        setStats((prev) => ({ ...prev, loading: false, error: true }));
      }
    }

    fetchStats();
  }, [handle]);

  return stats;
}
