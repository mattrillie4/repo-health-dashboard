"use client";

import { useState } from "react";
import RepoSummary from "@/components/RepoSummary";
import SearchForm from "@/components/SearchForm";
import { fakeRepoReports } from "./data/fakeRepoReports";
import type { Repo } from "@/lib/types";

export default function HomePage() {
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  function handleSearch(repoInput: string, ownerInput: string) {
    const normalizedInput = `${repoInput.trim().toLowerCase()}/${ownerInput.trim().toLowerCase()}`;
    const repo = fakeRepoReports[normalizedInput]; // set repo to fake data

    // if no repo matches, set to null
    if (!repo) {
      setSelectedRepo(null);
    }
    setSelectedRepo(repo);
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
    </main>
  );
}
