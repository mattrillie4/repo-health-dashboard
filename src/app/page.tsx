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
    const repo = fakeRepoReports[normalizedInput]; // set repo to fake data

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
      const report: Repo = {
        owner: data.owner.login,
        name: data.name,
        fullName: data.full_name,
        description: data.description,
        stars: data.stargazers_count,
        forks: data.forks_count,
        primaryLanguage: data.language,
        hasReadme: true,
        hasLicense: Boolean(data.license),
        hasCi: true,
        openIssues: data.open_issues_count,
        openPullRequests: 0,
        updatedAt: data.updated_at,
        score: 12,
        tips: ["string"],
        languages: [{ name: "example", percentage: 23 }],
      };
      // if no repo matches, set to null
      if (!repo) {
        setSelectedRepo(null);
      }
      setSelectedRepo(report);
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
