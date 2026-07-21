"use client";

import { useState } from "react";
import RepoSummary from "@/components/RepoSummary";
import SearchForm from "@/components/SearchForm";
import { fakeRepoReports } from "./data/fakeRepoReports";
import type { Repo } from "@/lib/types";

export default function HomePage() {
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [error, setError] = useState("");

  async function handleSearch(repoInput: string, ownerInput: string) {
    const normalizedInput = `${ownerInput.trim().toLowerCase()}/${repoInput.trim().toLowerCase()}`;
    const repo = fakeRepoReports[normalizedInput]; // set repo to fake data

    try {
      const response = await fetch(
        `https://api.github.com/repos/${normalizedInput}`,
      );

      const data = await response.json();
      // if error not thrown, check here
      if (!response.ok) {
        setError(data.message);
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
        openPullRequests: 20,
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
    }
  }

  return (
    <main>
      <h1>GitHub Repo Health Dashboard</h1>

      <SearchForm onSearch={handleSearch} />

      {selectedRepo ? (
        <RepoSummary repo={selectedRepo} />
      ) : (
        <p>Search for a repository to see its health report.</p>
      )}
      {error && <p>{error}</p>}
    </main>
  );
}
