"use client";

import { useState } from "react";
import RepoSummary from "@/components/RepoSummary";
import SearchForm from "@/components/SearchForm";
import { fakeRepoReports } from "./data/fakeRepoReports";
import type { Repo } from "@/lib/types";

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

      const data = await response.json();
      // if error not thrown, check here
      if (!response.ok) {
        setError(data.error ?? "Repository search failed");
        return;
      }

      console.log(data);
      const repo: Repo = {
        owner: data.owner,
        name: data.name,
        fullName: data.fullName,
        description: data.description,
        stars: data.stars,
        forks: data.forks,
        primaryLanguage: data.primaryLanguage,
        hasReadme: data.hasReadme,
        hasLicense: data.hasLicense,
        openIssues: data.openIssues,
        openPullRequests: data.openPullRequests,
        updatedAt: data.updatedAt,
        score: 0,
        tips: ["Tips coming soon"],
        languages: [{ name: "example", percentage: 23 }],
      };
      // if no repo matches, set to null
      if (!repo) {
        setSelectedRepo(null);
      }
      setSelectedRepo(repo);
    } catch (err: any) {
      setError(err.message);
      console.log(err);
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
