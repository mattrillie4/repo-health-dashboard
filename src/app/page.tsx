"use client";

import { useState } from "react";
import RepoSummary from "@/components/RepoSummary";
import SearchForm from "@/components/SearchForm";
import type { Repo, RepoApiResponse } from "@/lib/types";

export default function HomePage() {
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [error, setError] = useState("");
  const [repoLoading, setRepoLoading] = useState(false);

  async function handleSearch(repoInput: string, ownerInput: string) {
    const normalizedInput = `${encodeURIComponent(ownerInput.trim().toLowerCase())}/${encodeURIComponent(repoInput.trim().toLowerCase())}`;

    setError(""); // reset error to nothing
    setRepoLoading(true);
    setSelectedRepo(null);

    try {
      const response = await fetch(`/api/repos/${normalizedInput}`);

      const data: unknown = await response.json();
      // if error not thrown, check here
      if (!response.ok) {
        const errorData = data as { error?: string };
        setError(errorData.error ?? "Repository search failed");
        return;
      }

      const repoData = data as RepoApiResponse;

      const repo: Repo = {
        owner: repoData.owner,
        name: repoData.name,
        fullName: repoData.fullName,
        description: repoData.description,
        stars: repoData.stars,
        forks: repoData.forks,
        primaryLanguage: repoData.primaryLanguage,
        hasReadme: repoData.hasReadme,
        hasLicense: repoData.hasLicense,
        openIssues: repoData.openIssues,
        openPullRequests: repoData.openPullRequests,
        updatedAt: repoData.updatedAt,
        score: repoData.score,
        tips: repoData.tips,
        languages: repoData.languagePercentages,
      };
      // if no repo matches, set to null

      setSelectedRepo(repo);
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occured",
      );
    } finally {
      setRepoLoading(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        GitHub Repo Health Dashboard
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
        Get a quick, practical overview of any public repository.
      </p>

      <SearchForm onSearch={handleSearch} />

      {selectedRepo && !repoLoading ? (
        <RepoSummary repo={selectedRepo} />
      ) : (
        !repoLoading && (
          <p className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-sm text-slate-500">
            Search for a repository to see its health report.
          </p>
        )
      )}
      {repoLoading && (
        <p className="mt-10 rounded-xl border border-slate-200 bg-white px-6 py-8 text-center text-sm text-slate-600 shadow-sm">
          Loading repository report…
        </p>
      )}
      {error && <p role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
    </main>
  );
}
