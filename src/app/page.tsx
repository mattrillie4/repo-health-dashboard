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
      console.log(data);
      // if no repo matches, set to null
      if (!repo) {
        setSelectedRepo(null);
      }
      setSelectedRepo(repo);
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
