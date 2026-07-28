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
        score: 0,
        tips: ["Tips coming soon"],
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
    <main>
      <h1>GitHub Repo Health Dashboard</h1>

      <SearchForm onSearch={handleSearch} />

      {selectedRepo && !repoLoading ? (
        <RepoSummary repo={selectedRepo} />
      ) : (
        <p>Search for a repository to see its health report.</p>
      )}
      {repoLoading && <p>Repo is loading...</p>}
      {error && <p>{error}</p>}
    </main>
  );
}
